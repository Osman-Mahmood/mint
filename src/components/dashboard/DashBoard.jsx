import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../style.css'
import Table from 'react-bootstrap/Table';
import { Contract, errors, ethers } from 'ethers';
import Button from 'react-bootstrap/Button';
import MintModal from './MintModal';
import TransferModal from './TransferModal';
import ClaimModal from './ClaimModal';
import factoryAbi from '../../instances/abis/factoryAbi.json';
import factoryEthAbi from "../../instances/abis/factoryEthAbi.json"
import Skeleton from 'react-loading-skeleton'
import { useAccount, useBalance, useContractRead, erc20ABI, useChainId, useNetwork } from 'wagmi';
import { factoryAddress, factoryEthAddresss } from '../../instances/addresses';
import TokenBalance from './renders/TokenBalance';
import UTokenBalance from './renders/UTokenBalance';
import Countdown from "react-countdown";
import { GiPodiumWinner } from "react-icons/gi"
const Dashboard = () => {
    let { isReferesh } = useSelector((state) => state.connect);
    const { chain } = useNetwork()

    const { address, isConnected } = useAccount();

    const chainId = useChainId();
    const ETHProvider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli");
    const PolygonProvider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/")


    let [nativeBal, setNativeBal] = useState(null)
    const getBal = async () => {
        try {
            if (chainId == 5 || chainId == 80001) {
                let provider = new ethers.providers.Web3Provider(window.ethereum);
                const balance = await provider.getBalance(address);
                setNativeBal(ethers.utils.formatEther(balance))
            }

        } catch (error) {
            console.error("error while get bal", error);
        }
    }
    const [uNativeBal, setUNativeBal] = useState(null)
    const nativeUBal = async () => {
        try {
            if (chainId == 5 || chainId == 80001) {
                let contract = null
                let provider = new ethers.providers.Web3Provider(window.ethereum);
                let signer = provider.getSigner();
                if (chainId == 5) {
                    contract = new Contract(factoryEthAddresss, factoryAbi, signer);
                } else if (chainId == 80001) {
                    contract = new Contract(factoryAddress, factoryAbi, signer);
                }
                let u_eth_address = await contract.deployedAddressOfEth();
                const new_instance = new Contract(u_eth_address, erc20ABI, signer)
                const u_eth_bal = await new_instance.balanceOf(address);
                setUNativeBal(ethers.utils.formatEther(u_eth_bal))
            }
        } catch (error) {

        }
    }
    const [tokensList, setTokensList] = useState([])
    const getUTokens = async () => {
        try {

            let contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
            if (chainId == 5) {
                contract = new Contract(factoryEthAddresss, factoryEthAbi, ETHProvider);
            } else if (chainId == 80001) {
                contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
            }
            const u_tokens = await contract.all_uTokensOfAllowedTokens();
            let arr = []
            for (let index = 0; index < u_tokens.length; index++) {
                let obj = {}
                const symbol = await contract.get_CurrencyOfuToken(u_tokens[index]);
                const alternateAddress = await contract.get_TokenAddressOfuToken(u_tokens[index])
                obj.label = symbol;
                obj.value = symbol;
                obj.address = u_tokens[index];
                obj.alternateAddress = alternateAddress
                arr.push(obj)
            }
            console.log("arr", arr);
            setTokensList(arr)

        } catch (error) {
            console.error("error while get u tokens", error);
        }
    }
    useEffect(() => {

        getUTokens()
        if (isConnected) {
            getBal()
            nativeUBal()
        }

    }, [isConnected, chain, isReferesh]);
    // Random component
   

    // Renderer callback with condition
    const renderer = ({ days,hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            getWinnerTime()
        } else {
            // Render a countdown
            // return <span>{hours}:{minutes}:{seconds}</span>;
            return <div id="countdown">
            <div id='tiles'>
            {/* <span>{hours}:{minutes}:{seconds}</span> */}
            <span>{days}</span>
            <span>{hours}</span>
            <span>{minutes}</span>
            <span>{seconds}</span>
            
            </div>
            <div class="labels">
              <li>Days</li>
              <li>Hours</li>
              <li>Mins</li>
              <li>Secs</li>
            </div>
          </div>
        }
    };
    let [winnerTime, setWinnerTime] = useState(null);
    let [winnerAddress, setWinnerAddress] = useState(null);
    let [winnerLimitTime, setWinnerLimitTime] = useState(Date.now())
    const getWinnerTime = async () => {
        try {
            let contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
            if (chainId == 5) {
                contract = new Contract(factoryEthAddresss, factoryEthAbi, ETHProvider);
            } else if (chainId == 80001) {
                contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
            }
            let { startTime, endTime } = await contract.get_CurrentPeriod_StartAndEndTime();
            console.log("endTime, ", endTime.toNumber(), startTime.toNumber());
            setWinnerTime(endTime.toNumber());
            let winnerAddress = await contract.get_currentWinner();
            setWinnerAddress(winnerAddress)
        } catch (error) {
            console.error("error while get winner time", error);
        }
    }
    useEffect(() => {
        getWinnerTime()
    }, [])
    return (
        <div className='container-fluid  text-white dashboard' >
            {/* <div className='row d-flex justify-content-center mb-3' style={{ height: "60px" }}>
                <div className='d-flex justify-content-around  w-25 bg-light text-dark rounded' >
                    <div>
                        <GiPodiumWinner />
                    </div>
                    <div>
                        {
                            winnerTime == null ? <Skeleton /> :
                                <Countdown
                                    date={Date.now() + (((parseInt(winnerTime) * 1000)) - Date.now())}
                                    renderer={renderer}
                                />
                        }

                    </div>
                </div>
            </div> */}
            <div className=''>
            <div className='row'>
                    <div className='col-lg-6 col-sm-12'>
                    {/* <div id="countdown">
                <div id='' className='tiles  d-flex font'>
                    <li className='box2'>24</li>
                    <li className='box2'>02</li>
                    <li className='box2'>59</li>
                    <li className='box2'>50</li>
                </div>
                <div class="labels">
                    <li>Days</li>
                    <li>Hours</li>
                    <li>Mins</li>
                    <li>Secs</li>
                </div>
                <div className='new_box'>

                </div>

            </div> */}
             <div className='new_box pt-3 d-flex rounded justify-content-between'>
                <div className='d-block text-center '>
                  <h5>02</h5>
                  <p className='text-primary'>Days</p>
                </div>
                <div className='d-block  text-center'>
                  <h5>02</h5>
                  <p className='text-primary'>Hours</p>
                </div>
                <div className='d-block  text-center'>
                  <h5>02</h5>
                  <p className='text-primary'>Minutes</p>
                </div>
                <div className='d-block text-center'>
                  <h5>02</h5>
                  <p className='text-primary'>Seconds</p>
                </div>
             </div>
                    </div>
                    <div className='col-lg-6 col-sm-12'>
                    <div className='new_box_2 p-3 d-lg-flex d-sm-block pt-4 rounded justify-content-between'>
                        <div className='time d-lg-block d-flex gap-lg-0 gap-5'>
                            <h6 className='text-dark text-start'>Remaining Time</h6>
                            <div className='timer text-dark d-flex'>
                                <li>03</li>
                                <li>04</li>
                                <li>59</li>
                                <li>60</li>
                            </div>
                        </div>
                        <div className='d-lg-block d-flex gap-lg-0 gap-5'>
                        <h6 className='text-dark'>Contract Address</h6>
                <p className='text-dark mt-2 text-truncate'>adresssssskdkslkdslkdlskdlklsldkslkdlskdlksl</p>
                        </div>
                        <div>
                        <button className='btn btn-light btn_height'>Winner</button>
                        </div>
                       
                       
            </div>
                        </div>
               
            </div>
           </div>
            {/* <div className='row d-flex justify-content-center ' style={{ height: "50px" }}>
                <div className='d-flex justify-content-around  w-50 bg-light text-dark rounded' >
                    <div>
                        <GiPodiumWinner />
                    </div>
                    <div>
                    {winnerAddress == null ? 
                    <Skeleton /> :
                    winnerAddress
                    } 
                    </div>
                </div>
            </div> */}
            <div className='row '>
                <div className='col-lg-6 col-sm-12'>
                    <div className='box'>
                        <div className='box_content p-3'>
                            <h5>Your Deposit</h5>

                            <Table borderless>
                                <thead>
                                    <tr className=''>
                                        <th className='text-center'>U-Assets</th>
                                        <th className='text-center'>U-Wallet Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center'>
                                            {isConnected ? `U-${chain.nativeCurrency.symbol}` : <Skeleton />}
                                        </td>
                                        <td className='text-center'>{uNativeBal ? Number(uNativeBal) : <Skeleton />}</td>
                                        
                                          <td> { isConnected && <ClaimModal symbol={chain?.nativeCurrency.symbol} claimType="native" />} </td>
                                        <td>{isConnected && <TransferModal symbol={chain?.nativeCurrency.symbol} transferType="native" />}</td>
                                    </tr>

                                    {tokensList?.map((item) => {
                                        return <tr>
                                            <td className='text-center'>
                                                U-{item.label}</td>
                                            <td className='text-center'>
                                                {
                                                    isConnected ?
                                                        <UTokenBalance alternateAddress={item.address} />
                                                        :
                                                        <Skeleton />
                                                }
                                            </td>
                                            <td>  <ClaimModal symbol={item.label} tokenAddress={item.address} claimType="token" /></td>
                                            <td><TransferModal symbol={item.label} tokenAddress={item.address} transferType="token" /></td>
                                        </tr>
                                    })
                                    }
                                </tbody>
                            </Table>

                        </div>
                    </div>
                </div>
                <div className='col-lg-6 col-sm-12'>
                    <div className='box'>
                        <div className='box_content p-3'>
                            <h5>Available Assets</h5>
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th className='text-center'>Tokens</th>
                                        <th className='text-center'>Assets</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center'>
                                            {isConnected ? chain.nativeCurrency.symbol : <Skeleton />}
                                        </td>
                                        <td className='text-center'>{nativeBal ? Number(nativeBal).toFixed(6) : <Skeleton />}</td>
                                        <td>  {isConnected && <MintModal symbol={chain.nativeCurrency.symbol} mintType="native" />}</td>
                                        <td>  <Button variant="primary" >
                                            Detail
                                        </Button></td>
                                    </tr>
                                    {
                                        tokensList?.map((item) => {
                                            return <tr>
                                                <td className='text-center' >
                                                    {item.label}</td>
                                                <td className='text-center'>
                                                    {
                                                        isConnected ?
                                                            <TokenBalance alternateAddress={item.alternateAddress} />
                                                            :
                                                            <Skeleton />
                                                    }
                                                </td>
                                                <td className='text-center'>  <MintModal symbol={item.label}
                                                    mintType="token"
                                                    tokenAddress={item.address}
                                                    variant="primary" /></td>
                                                <td>  <Button variant="primary" >
                                                    Detail
                                                </Button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

const Completionist = ({getWinnerTime}) => {
    useEffect(()=>{
        getWinnerTime()
    },[])
};