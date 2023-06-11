import React, { useState, useEffect } from 'react'
import { useAccount, erc20ABI, useChainId, useNetwork } from 'wagmi';
import { ethers, Contract } from 'ethers';
import Skeleton from 'react-loading-skeleton';
import { Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
function AddTokenInWallet({ address }) {
    let [tokenDetials, setTokenDetails] = useState(null)
    const getPairs = async () => {
        try {
    
            let provider = new ethers.providers.Web3Provider(window.ethereum);
            let signer = provider.getSigner();
           let contract = new Contract(address, erc20ABI, signer);
            const symbol = await contract.symbol()
            const decimals = await contract.decimals()
            let obj = {
                address: address, // The address that the token is at.
                symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: decimals,
            }
            setTokenDetails(obj)
        } catch (error) {
            console.error("error while get pairs in render", error);
        }
    }
    useEffect(() => {
        if(address != null){
            getPairs()
        }
    }, [address])
    const addToken = async () => {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await window.ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: tokenDetials,
              },
            });

            if (wasAdded) {
              toast.success('Added successfully');
            } else {
              toast.error('Your loss!');
            }
          } catch (error) {
            console.log(error);
          }
    }
    return (
        <>
        {
            tokenDetials == null ? <Skeleton />
            :
        <Button variant="primary" className="p-0"  onClick={addToken} >
            Add to Wallet  
        </Button >
        }
        </>
    )
}

export default AddTokenInWallet