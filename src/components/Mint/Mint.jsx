import React, { useState, useEffect, CSSProperties } from "react";
import { useAccount, erc20ABI, useChainId } from "wagmi";
import { Contract, ethers } from "ethers";
import BeatLoader from "react-spinners/BeatLoader";
import factoryAbi from "../../instances/abis/factoryAbi.json";
import factoryEthAbi from "../../instances/abis/factoryEthAbi.json";
import { factoryAddress, factoryEthAddresss } from "../../instances/addresses";
import tokenAbi from "../../instances/abis/erc20_tokenAbi.json";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Web3 from "web3";
import { rpc } from "../../utils";
import PasswordModal from "../passwordModal/PasswordModal";
import { refreshBalance } from "../../store/wallet/wallet";
import RecoverPasswordModal from "../passwordModal/RecoverPasswordModal";
import image from '../../assets/top.jpg'
const rpcUrl = new Web3(rpc);

const Mint = ({ mintType, tokenAddress, onHide, alternateAddress }) => {
  const dispatch = useDispatch();
  let { isReferesh } = useSelector((state) => state.connect);
  const ETHProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );
  const PolygonProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/"
  );
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const chainId = useChainId();

  let [etherAmount, setEtherAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [pass, setPass] = useState();
  const [isSeePass, setIsSeePass] = useState(false);
  const seePass = (e) => {
    e.preventDefault();
    setIsSeePass(!isSeePass);
  };
  const mintU_tokens = async () => {
    try {
      if (chainId == 5 || chainId == 80001) {
        if (
          etherAmount <= 0 ||
          etherAmount == null ||
          etherAmount == undefined ||
          etherAmount == ""
        ) {
          toast.error("Enter amount please");
          return;
        }
        let contract = null;
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        if (chainId == 5) {
          contract = new Contract(factoryEthAddresss, factoryAbi, signer);
        } else if (chainId == 80001) {
          contract = new Contract(factoryAddress, factoryAbi, signer);
        }
        let isPass = await contract.isPasswordSet(address);
        if (!isPass) {
          handleShow();
        }
        if (pass === null || pass === undefined || pass === "") {
          toast.error("Enter Password please");
          return;
        }
        const isCorrectPass = await contract.isPasswordCorrect(address, pass);
        if (!isCorrectPass) {
          toast.error("Enter correct password");
          return;
        }
        if (mintType == "native") {
          setIsLoading(true);
          const etherAddress = await contract.deployedAddressOfEth();

          let ethAmount = ethers.utils.parseEther(etherAmount);
          const tx = await contract.deposit(pass, etherAddress, ethAmount, {
            value: ethAmount,
            gasLimit: 1000000,
          });
          let receipt = await tx.wait();
          dispatch(refreshBalance(!isReferesh));

          toast.success("U-token minted");
          setIsLoading(false);
          onHide();
        } else if (mintType == "token") {
          let erc_token_address = await contract.get_TokenAddressOfuToken(
            tokenAddress
          );
          const erc_20_instnace = new Contract(
            erc_token_address,
            erc20ABI,
            signer
          );
          const bal = await erc_20_instnace.balanceOf(address);
          if (Number(ethers.utils.formatEther(bal)) < etherAmount) {
            toast.error("Insufficient Tokens");
            return;
          }
          setIsLoading(true);
          let allowance = await erc_20_instnace.allowance(
            address,
            chainId == 5 ? factoryEthAddresss : factoryAddress
          );
          console.log("allowance", ethers.utils.formatEther(allowance));
          if (ethers.utils.formatEther(allowance) < etherAmount) {
            let tokenTx = await erc_20_instnace.approve(
              chainId == 5 ? factoryEthAddresss : factoryAddress,
              ethers.utils.parseEther(etherAmount),
              { gasLimit: 1000000 }
            );
            await tokenTx.wait();
          }
          let ethAmount = ethers.utils.parseEther(etherAmount);
          const tx = await contract.deposit(pass, tokenAddress, ethAmount, {
            value: "0",
            gasLimit: 1000000,
          });
          let receipt = await tx.wait();
          toast.success("U-token minted");
          dispatch(refreshBalance(!isReferesh));
          setIsLoading(false);
          onHide();
          console.log(receipt);
        }
      } else {
        toast.error("Wrong Network");
      }
    } catch (error) {
      setIsLoading(false);
      const errorData = JSON.parse(JSON.stringify(error));
      if(errorData.message){
        toast.error(errorData.message);
        return
      }
      if (errorData.error.message && chainId == 5) {
        toast.error(errorData.error.message);
      } else if (errorData.error.message && chainId == 80001) {
        toast.error(errorData.data.message);
      }
      console.error("error while calim u tokens", errorData);
    }
  };

  // const checkPassword = async () => {
  //   try {
  //     let contract = null;
  //     if (chainId == 5) {
  //       contract = new Contract(factoryEthAddresss, factoryEthAbi, ETHProvider);
  //     } else if (chainId == 80001) {
  //       contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
  //     }
  //     let isPass = await contract.isPasswordSet(address);
  //     if (!isPass) {
  //       handleShow();
  //       onHide();
  //     }
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   if ((isConnected && chainId == 5) || chainId == 80001) {
  //     checkPassword();
  //   }
  // }, [isConnected]);

  const setMax = async () => {
    try {
      if (mintType == "native") {
        let contract = null
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        if (chainId == 5) {
          contract = new Contract(factoryEthAddresss, factoryAbi, signer);
        } else if (chainId == 80001) {
          contract = new Contract(factoryAddress, factoryAbi, signer);
        }
        const balance = await provider.getBalance(address);
        setEtherAmount(ethers.utils.formatEther(balance))
      } else if (mintType == "token") {
        let contract = null
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        if (chainId == 5) {
          contract = new Contract(alternateAddress, erc20ABI, signer);
        } else if (chainId == 80001) {
          contract = new Contract(alternateAddress, erc20ABI, signer);
        }
        const coinBal = await contract.balanceOf(address);
        setEtherAmount(ethers.utils.formatEther(coinBal))
      }

    } catch (error) {
      console.error("error while get coin balance", error);
    }
  }
  return (
    <div className="container-fluid p-0">
      <div className="">
        
        <RecoverPasswordModal show={show1} handleClose={handleClose1} />
        <div className="row  align-items-center">
          <div className="col-lg-12 align-items-center ">
            <div className="animate__animated animate bounce card w-100 justify-content-center ">
              <div className="container mt-3">
                <img
                  src={image}
                  className="card-img-top "
                  style={{height:"auto"}}
                  alt="..."
                />
              </div>
              <div className="card-body">
                {/* <h5 className="card-title ms-1">Mint Now</h5> */}

                <div>
                  {/* <p className="card-text mb-2 ms-1">See more Mint Plans and interact with us</p> */}
                  <label htmlFor="">Amount</label>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      className="mb-3 w-100 rounded border mt-3 p-2"
                      placeholder="Enter ether amount"
                      value={etherAmount}
                      onChange={(e) => {
                        setEtherAmount(e.target.value);
                      }}
                    />
                    <button className="w-25 ms-1 rounded btn btn-dark"
                    onClick={setMax}
                    >
                      MAX
                    </button>
                  </div>

                  <label htmlFor="" className="col-12">
                    Password
                  </label>
                  <div className="d-flex">
                    <input
                      type={isSeePass ? "text" : "password"}
                      className="w-75 rounded border p-2"
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                    />
                    <button
                      className="w-25 btn btn-light border rounded ms-1"
                      onClick={(e) => seePass(e)}
                    >
                      {isSeePass ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  </div>
                  <div
                    className="text-primary text-end mt-1 mb-1"
                    style={{ cursor: "pointer" }}
                    onClick={handleShow1}
                  >
                    Forgot Password
                  </div>
                  <button
                    className="btn btn-primary mb-1 mt-1 "
                    disabled={!isConnected}
                    onClick={() => mintU_tokens()}
                  >
                    {isLoading ? <BeatLoader color="#fff" /> : "Protect"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
