import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../style.css";
import Table from "react-bootstrap/Table";
import { Contract, errors, ethers } from "ethers";
import Button from "react-bootstrap/Button";
import MintModal from "./MintModal";
import TransferModal from "./TransferModal";
import ClaimModal from "./ClaimModal";
import factoryAbi from "../../instances/abis/factoryAbi.json";
import factoryEthAbi from "../../instances/abis/factoryEthAbi.json";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import {
  useAccount,
  useBalance,
  useContractRead,
  erc20ABI,
  useChainId,
  useNetwork,
} from "wagmi";
import { factoryAddress, factoryEthAddresss } from "../../instances/addresses";
import TokenBalance from "./renders/TokenBalance";
import UTokenBalance from "./renders/UTokenBalance";
import Countdown from "react-countdown";
import { GiPodiumWinner } from "react-icons/gi";
const Dashboard = () => {
  let { isReferesh } = useSelector((state) => state.connect);
  const { chain } = useNetwork();

  const { address, isConnected } = useAccount();

  const chainId = useChainId();
  const ETHProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );
  const PolygonProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/"
  );

  let [nativeBal, setNativeBal] = useState(null);
  const getBal = async () => {
    try {
      if (chainId == 5 || chainId == 80001) {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(address);
        setNativeBal(ethers.utils.formatEther(balance));
      }
    } catch (error) {
      console.error("error while get bal", error);
    }
  };
  const [uNativeBal, setUNativeBal] = useState(null);
  const nativeUBal = async () => {
    try {
      if (chainId == 5 || chainId == 80001) {
        let contract = null;
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        let signer = provider.getSigner();
        if (chainId == 5) {
          contract = new Contract(factoryEthAddresss, factoryAbi, signer);
        } else if (chainId == 80001) {
          contract = new Contract(factoryAddress, factoryAbi, signer);
        }
        let u_eth_address = await contract.deployedAddressOfEth();
        const new_instance = new Contract(u_eth_address, erc20ABI, signer);
        const u_eth_bal = await new_instance.balanceOf(address);
        setUNativeBal(ethers.utils.formatEther(u_eth_bal));
      }
    } catch (error) {}
  };
  const [tokensList, setTokensList] = useState([]);
  const getUTokens = async () => {
    try {
      let contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
      if (chainId == 5) {
        contract = new Contract(factoryEthAddresss, factoryEthAbi, ETHProvider);
      } else if (chainId == 80001) {
        contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
      }
      const u_tokens = await contract.all_uTokensOfAllowedTokens();
      let arr = [];
      for (let index = 0; index < u_tokens.length; index++) {
        let obj = {};
        const symbol = await contract.get_CurrencyOfuToken(u_tokens[index]);
        const alternateAddress = await contract.get_TokenAddressOfuToken(
          u_tokens[index]
        );
        obj.label = symbol;
        obj.value = symbol;
        obj.address = u_tokens[index];
        obj.alternateAddress = alternateAddress;
        arr.push(obj);
      }
      console.log("arr", arr);
      setTokensList(arr);
    } catch (error) {
      console.error("error while get u tokens", error);
    }
  };
  useEffect(() => {
    getUTokens();
    if (isConnected) {
      getBal();
      nativeUBal();
    }
  }, [isConnected, chain, isReferesh]);

  const withDrawReward = async () => {
    try {
      let contract = null;
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      if (chainId == 5) {
        contract = new Contract(factoryEthAddresss, factoryAbi, signer);
      } else if (chainId == 80001) {
        contract = new Contract(factoryAddress, factoryAbi, signer);
      }
      const tx = await contract.withdrawReward();
      await tx.wait();
      getWinnerTime();
      toast.success("Bouns cashed successfully");
    } catch (error) {
      console.error(
        "error while withdraw reward",
        JSON.parse(JSON.stringify(error))
      );
    }
  };

  let [winnerTime, setWinnerTime] = useState(null);
  let [winnerAddress, setWinnerAddress] = useState(null);
  let [winnerLimitTime, setWinnerLimitTime] = useState(null);
  const getWinnerTime = async () => {
    try {
      setWinnerTime(null);
      setWinnerLimitTime(null);
      let contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
      if (chainId == 5) {
        contract = new Contract(factoryEthAddresss, factoryEthAbi, ETHProvider);
      } else if (chainId == 80001) {
        contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
      }
      let { startTime, endTime } =
        await contract.get_CurrentPeriod_StartAndEndTime();
      setWinnerTime(endTime.toNumber());

      let winnerAdd = await contract.get_currentWinner();
      setWinnerAddress(winnerAdd);
      let time = await contract.get_TimeLimitForWinnerForCurrentPeriod();
      setWinnerLimitTime(time.toNumber());
      console.log("time, ", time.toNumber());
    } catch (error) {
      console.error("error while get winner time", error);
    }
  };
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      getWinnerTime();
    } else {
      return (
        <div className="new_box p-3 d-flex rounded justify-content-around">
          <span className="text-dark ms-2 ">
            <h4>Every 369 hours a winner is randomly selected.</h4>
          </span>
          <div className="d-block text-center ">
            <h5>{days}</h5>
            <div className="text-primary mt-1 ">Days</div>
          </div>
          <div className="d-block  text-center">
            <h5>{hours}</h5>
            <div className="text-primary mt-1 ">Hours</div>
          </div>
          <div className="d-block  text-center">
            <h5>{minutes}</h5>
            <div className="text-primary mt-1 ">Minutes</div>
          </div>
          {minutes <= 0 && (
            <div className="d-block text-center">
              <h5>{seconds}</h5>
              <div className="text-primary mt-1 ">Seconds</div>
            </div>
          )}
        </div>
      );
    }
  };
  const withDrawLimitRender = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      return (
        <div className="timer text-danger d-flex">Withdraw time finished</div>
      );
    } else {
      return (
        <div className="timer text-dark d-flex">
          <li>{days}</li>
          <li>{hours}</li>
          <li>{minutes}</li>
          <li>{seconds}</li>
        </div>
      );
    }
  };

  useEffect(() => {
    getWinnerTime();
  }, []);
  return (
    <div className="container-fluid  text-white dashboard">
      <div className="">
        <div className="row ">
          <div className="col-lg-6 col-sm-12 ">
            {winnerTime == null ? (
              // <Skeleton  />
              <div className="new_box shadow  d-flex rounded justify-content-around p-5"></div>
            ) : (
              <Countdown
                date={Date.now() + (parseInt(winnerTime) * 1000 - Date.now())}
                renderer={renderer}
              />
            )}
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="new_box_2 shadow p-3 d-lg-flex d-sm-block pt-4 rounded justify-content-between">
              <div className="time d-lg-block d-flex gap-lg-0 gap-5">
                <h6 className="text-dark text-start">Remaning Time</h6>
                {winnerLimitTime == null ? (
                  <Skeleton />
                ) : (
                  <Countdown
                    date={
                      Date.now() +
                      (parseInt(winnerLimitTime) * 1000 - Date.now())
                    }
                    renderer={withDrawLimitRender}
                  />
                )}
              </div>
              <div className="d-lg-block d-flex gap-lg-0 gap-5">
                <h6 className="text-dark">Winner Address</h6>
                <p className="text-dark mt-2 ">
                  {winnerAddress == null ? <Skeleton /> : winnerAddress}
                </p>
              </div>
              <div>
                {winnerAddress != null ? (
                  <button
                    className="btn btn-light btn_height"
                    disabled={winnerAddress != address}
                    onClick={withDrawReward}
                  >
                    Winner
                  </button>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="col-lg-6 col-sm-12">
          <div className="box shadow">
            <div className="box_content p-3">
              <h5>Protected</h5>

              <Table borderless>
                <thead>
                  <tr className="">
                    <th className="text-center">U-Assets</th>
                    <th className="text-center">U-Wallet Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      {isConnected ? (
                        `U-${chain.nativeCurrency.symbol}`
                      ) : (
                        <Skeleton />
                      )}
                    </td>
                    <td className="text-center">
                      {uNativeBal ? Number(uNativeBal) : <Skeleton />}
                    </td>

                    <td>
                      {" "}
                      {isConnected && (
                        <ClaimModal
                          symbol={chain?.nativeCurrency.symbol}
                          claimType="native"
                        />
                      )}{" "}
                    </td>
                    <td>
                      {isConnected && (
                        <TransferModal
                          symbol={chain?.nativeCurrency.symbol}
                          transferType="native"
                        />
                      )}
                    </td>
                  </tr>

                  {tokensList?.map((item) => {
                    return (
                      <tr>
                        <td className="text-center">U-{item.label}</td>
                        <td className="text-center">
                          {isConnected ? (
                            <UTokenBalance alternateAddress={item.address} />
                          ) : (
                            <Skeleton />
                          )}
                        </td>
                        <td>
                          {" "}
                          <ClaimModal
                            symbol={item.label}
                            tokenAddress={item.address}
                            claimType="token"
                          />
                        </td>
                        <td>
                          <TransferModal
                            symbol={item.label}
                            tokenAddress={item.address}
                            transferType="token"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <div className="box shadow">
            <div className="box_content p-3">
              <h5>Available Assets</h5>
              <Table borderless>
                <thead>
                  <tr>
                    <th className="text-center">Tokens</th>
                    <th className="text-center">Assets</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      {isConnected ? chain.nativeCurrency.symbol : <Skeleton />}
                    </td>
                    <td className="text-center">
                      {nativeBal ? Number(nativeBal).toFixed(6) : <Skeleton />}
                    </td>
                    <td>
                      {" "}
                      {isConnected && (
                        <MintModal
                          symbol={chain.nativeCurrency.symbol}
                          mintType="native"
                        />
                      )}
                    </td>
                    <td>
                      {/* <Button variant="primary" >
                                            Detail
                                        </Button> */}
                    </td>
                  </tr>
                  {tokensList?.map((item) => {
                    return (
                      <tr>
                        <td className="text-center">{item.label}</td>
                        <td className="text-center">
                          {isConnected ? (
                            <TokenBalance
                              alternateAddress={item.alternateAddress}
                            />
                          ) : (
                            <Skeleton />
                          )}
                        </td>
                        <td className="text-center">
                          {" "}
                          <MintModal
                            symbol={item.label}
                            mintType="token"
                            tokenAddress={item.address}
                            alternateAddress={item.alternateAddress}
                            variant="primary"
                          />
                        </td>
                        <td>
                          {/* <Button variant="primary" >
                                                    Detail
                                                </Button> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
