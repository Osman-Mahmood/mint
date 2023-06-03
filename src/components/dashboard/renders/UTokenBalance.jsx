import React, { useEffect, useState } from 'react'
import { useAccount, erc20ABI, useChainId, useNetwork } from 'wagmi'
import { ethers, Contract } from 'ethers';
import Skeleton from 'react-loading-skeleton';
import {useSelector} from 'react-redux'
function UTokenBalance({ alternateAddress }) {
  let { isReferesh } = useSelector((state) => state.connect);
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  const { chain, } = useNetwork()
  let [coinBalance, setCoinBalance] = useState(null)
  const chainId = useChainId();
 
  const getBalance = async () => {
    try {
      let contract = null
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      if (chainId == 5) {
        contract = new Contract(alternateAddress, erc20ABI, signer);
      } else if (chainId == 80001) {
        contract = new Contract(alternateAddress, erc20ABI, signer);
      }
      const coinBal = await contract.balanceOf(address);
      console.log("coinBal", ethers.utils.formatEther(coinBal));
      setCoinBalance(ethers.utils.formatEther(coinBal))

    } catch (error) {
      console.error("error while get coin balance", error);
    }


  }
  useEffect(() => {
    if (isConnected && chainId == 5 || chainId == 80001) {
      getBalance()
    }
  }, [alternateAddress, address, isConnected, isReferesh])
  return (
    <div>
      {coinBalance == null ? <Skeleton /> : `${coinBalance}`}
    </div>
  )
}

export default UTokenBalance