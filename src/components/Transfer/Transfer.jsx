import React, { useState, useEffect } from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import factoryAbi from "../../instances/abis/factoryAbi.json";
import { factoryAddress, factoryEthAddresss } from "../../instances/addresses"
import tokenAbi from "../../instances/abis/erc20_tokenAbi.json"
import { useSelector, useDispatch  } from 'react-redux';
import Web3 from 'web3';
import { rpc } from '../../utils';
import { isAddress, isContract } from '../../constants';
import RecoverPasswordModal from '../passwordModal/RecoverPasswordModal';
import PasswordModal from '../passwordModal/PasswordModal';
import { useAccount, useBalance, useContractRead, erc20ABI, useChainId, useNetwork } from 'wagmi';
import { Contract, ethers } from 'ethers';
import image from '../../assets/top.jpg'
import { refreshBalance } from '../../store/wallet/wallet';
const rpcUrl = new Web3(rpc)
const Claim = ({ transferType, tokenAddress, onHide }) => {
  const dispatch = useDispatch();
  let { isReferesh } = useSelector((state) => state.connect);
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const chainId = useChainId();

  let [etherAmount, setEtherAmount] = useState()
  const [transferAddress, setTransferAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [pass, setPass] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [isSeePass, setIsSeePass] = useState(false)
  const seePass = (e) => {
    e.preventDefault();
    setIsSeePass(!isSeePass)
  }
  const transferUTokens = async () => {
    try {
      if (etherAmount <= 0 || etherAmount == null || etherAmount == undefined || etherAmount == "") {
        toast.error("Enter amount please")
        return
      }
      if (transferAddress <= 0 || transferAddress == null || transferAddress == undefined || transferAddress == "") {
        toast.error("Enter Transfer Address")
        return
      }
      let contract = null
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      if (chainId == 5) {
        contract = new Contract(factoryEthAddresss, factoryAbi, signer);
      } else if (chainId == 80001) {
        contract = new Contract(factoryAddress, factoryAbi, signer);
      }
      let isPass = await contract.isPasswordSet(address);
      if (!isPass) {
        handleShow()
      }
      if (pass === null || pass === undefined || pass === "") {
        toast.error("Enter Password please")
        return
      }
      const isCorrectPass = await contract.isPasswordCorrect(address, pass);
      if (!isCorrectPass) {
        toast.error("Enter correct password")
        return
      }

      if (transferType == "native") {
        setIsLoading(true)
        const etherAddress = await contract.deployedAddressOfEth()
       let tx = await contract.transfer(
          pass, etherAddress, transferAddress, ethers.utils.parseEther(etherAmount)
        )
        await tx.wait();
        onHide()
        toast.success("U-Token transfered")
        setEtherAmount(0)
        setIsLoading(false)
        dispatch(refreshBalance(!isReferesh));
      } else if (transferType == "token") {
       
          setIsLoading(true)
         let tx = await contract.transfer(
            pass, tokenAddress, transferAddress, ethers.utils.parseEther(etherAmount)
          )
          await tx.wait();
          onHide()
          toast.success("U-Token transfered")
          setEtherAmount(0)
          setIsLoading(false)
          dispatch(refreshBalance(!isReferesh));
        }
      
      
    } catch (error) {
      setIsLoading(false)
      const errorData = JSON.parse(JSON.stringify(error));
      if(errorData.message){
        toast.error(errorData.message);
        return
      }
      if (errorData && chainId == 5) {
        toast.error(errorData.error.message);
      } else if (errorData && chainId == 80001) {
        toast.error(errorData.data.message);
      }
      console.error("error while calim u tokens", errorData);
    }
  }
 

  const setMax = async () => {
    try {
      if (transferType == "native") {
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
        setEtherAmount(ethers.utils.formatEther(u_eth_bal))
      } else if (transferType == "token") {
        let contract = null
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        if (chainId == 5) {
          contract = new Contract(tokenAddress, erc20ABI, signer);
        } else if (chainId == 80001) {
          contract = new Contract(tokenAddress, erc20ABI, signer);
        }
        const coinBal = await contract.balanceOf(address);
        setEtherAmount(ethers.utils.formatEther(coinBal))
      }

    } catch (error) {
      console.error("error while get coin balance", JSON.parse(JSON.stringify(error)));
    }
  }


  return (
    <div className='container-fluid p-0' >
      <div class="">
        <PasswordModal show={show} handleClose={handleClose} />
        <RecoverPasswordModal show={show1} handleClose={handleClose1} />
        <div className='row d-flex justify-content-center'>
          <div className='col-lg-12 align-items-center  '>
            <div class="animate__animated animate bounce card w-100 d-flex justify-content-center ">
              <div class="container mt-3">
                <img src={image} class="card-img-top " style={{height:"auto"}} alt="..." /></div>
              <div class="card-body">
                <h5 class="card-title ms-1">Transfer uTokens</h5>

                <div>
                  <div><span>Recipient address</span></div>
                  <input type='text' className='mb-3 w-100 rounded border p-2'
                    placeholder='Enter recipient address'
                    onChange={(e) => { setTransferAddress(e.target.value) }}
                  />
                  <div><span>Amount</span></div>
                  <div className='d-flex'>
                    <input type='number' className='mb-3 w-75 rounded border p-2'
                      placeholder='Enter ether amount'
                      value={etherAmount}
                      onChange={(e) => { setEtherAmount(e.target.value) }}
                    />
                    <button className='w-25 ms-1 rounded btn btn-dark' onClick={setMax}

                      disabled={!isConnected}
                    >MAX</button>
                  </div>
                  <span>Password</span>
                  <div className='d-flex'>

                    <input type={isSeePass ? "text" : "password"} className='w-75 rounded border p-2'
                      onChange={(e) => { setPass(e.target.value) }}
                    />
                    <button className='w-25 btn btn-light border rounded ms-1'
                      onClick={(e) => seePass(e)}
                    >
                      {
                        isSeePass ? <AiFillEyeInvisible /> : <AiFillEye />
                      }
                    </button>
                  </div>
                  <div className='text-primary text-end mt-1 mb-1' style={{ cursor: "pointer" }} onClick={handleShow1}>Forgot Password</div>
                  <button className="btn btn-primary mb-1 mt-1"
                    disabled={!isConnected}
                    onClick={() => transferUTokens()}>
                    {
                      isLoading ? <BeatLoader color="#fff" /> : "Transfer"
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-3'></div>
        </div>

      </div>

    </div>
  )
}

export default Claim
