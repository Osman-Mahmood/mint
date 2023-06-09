import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import toast from "react-hot-toast";
import FirstLanding from "../firstLanding/FirstLanding";
import logo1 from "../../assets/logo1.png";
import { useAccount, erc20ABI, useChainId, useNetwork } from "wagmi";
import { factoryAddress, factoryEthAddresss } from "../../instances/addresses";
import TokenBalance from "./renders/TokenBalance";
import UTokenBalance from "./renders/UTokenBalance";
import Countdown from "react-countdown";
import AddTokenInWallet from "./renders/AddToWallet";
import { refreshBalance } from "../../store/wallet/wallet";
const Dashboard = () => {
  const dispatch = useDispatch()
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
  const [ethAddress, setEthAddress] = useState(null);
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
        setEthAddress(u_eth_address);
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
      window.ethereum.on("accountsChanged", function (accounts) {
        window.location.reload(true);
      });
    }
  }, [isConnected, chain, isReferesh]);

  const claimButtonStatus = async () => {
    try {
      if (chainId == 5 || chainId == 80001) {
        let contract = new Contract(
          factoryAddress,
          factoryAbi,
          PolygonProvider
        );
        if (chainId == 5) {
          contract = new Contract(
            factoryEthAddresss,
            factoryEthAbi,
            ETHProvider
          );
        } else if (chainId == 80001) {
          contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
        }
        const previousPeriod = await contract.get_PreviousPeriod();
        const isDepositedInPeriod = await contract.IsDepositedInPeriod(
          previousPeriod
        );
        if (isDepositedInPeriod) {
          const rewardLimit = await contract.get_TimeLimitForWinnerForCurrentPeriod();
          const currentTime = Date.now() / 1000;
          if (currentTime > rewardLimit.toNumber()) {
            setIsClaimEnables(false);
          } else {
            const isRewardCollected = await contract.IsRewardCollectedOfPeriod(previousPeriod);
            isRewardCollected ? setIsClaimEnables(false) : setIsClaimEnables(true);
          }
        } else {
          setIsClaimEnables(false);
        }
      }
    } catch (error) {
      console.error("error while claim button status", error);
    }
  };
  const [isClaimEnabled, setIsClaimEnables] = useState(true);
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
      setIsClaimEnables(false);
      rewardHistory();
      getBal()
      dispatch(refreshBalance(!isReferesh));
      toast.success("Bouns cashed successfully");
    } catch (error) {
      console.error(
        "error while withdraw reward",
        JSON.parse(JSON.stringify(error))
      );
    }
  };
  const [rewarArray, setRewardArray] = useState([]);
  const rewardHistory = async () => {
    try {
      let contract = null;
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      if (chainId == 5) {
        contract = new Contract(factoryEthAddresss, factoryAbi, signer);
      } else if (chainId == 80001) {
        contract = new Contract(factoryAddress, factoryAbi, signer);
      }
      const pendingPeriodsForReward = await contract.pendingPeriodsForReward();
      console.log("rewardEth", pendingPeriodsForReward);
      if (pendingPeriodsForReward.length == 0) {
        setRewardArray([]);
        return;
      } else {
        let previousArr = [];
        const rewardEth = await contract.rewardHistoryForEth();
        if (ethers.utils.formatEther(rewardEth) > 0) {
          let obj = {};
          obj.symbol = chainId == 5 ? "ETH" : "MATIC";
          obj.token = "";
          obj.amount = ethers.utils.formatEther(rewardEth);
          previousArr.push(obj);
        }
        for (let index = 0; index < pendingPeriodsForReward.length; index++) {
          let pending = await contract.rewardHistoryForTokensForPeriod(
            pendingPeriodsForReward[index].toNumber()
          );
          for (let i = 0; i < pending.length; i++) {
            let { token, amount } = pending[i];
            let tokenContract = new Contract(token, erc20ABI, signer);
            let obj = {};
            if (previousArr.length == 0) {
              obj.symbol = await tokenContract.symbol();
              obj.token = token;
              obj.amount = Number(ethers.utils.formatEther(amount));
              previousArr.push(obj);
            } else {
              const found = previousArr.find(
                (item, index) => item.token == token
              );
              if (found == undefined) {
                obj.symbol = await tokenContract.symbol();
                obj.token = token;
                obj.amount = Number(ethers.utils.formatEther(amount));
                previousArr.push(obj);
              } else {
                let foundIndex = previousArr.indexOf(found);
                previousArr[foundIndex].amount =
                  Number(ethers.utils.formatEther(amount)) +
                  previousArr[foundIndex].amount;
              }
            }
          }
        }
        console.log("previousArr", previousArr);
        setRewardArray(previousArr);
      }
    } catch (error) {
      setRewardArray([]);
      console.error("error while withdraw reward", error);
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
      rewardHistory();
      claimButtonStatus()
      // isRewardClaimed();
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

  // const isRewardClaimed = async () => {
  //   try {
  //     if (chainId == 5 || chainId == 80001) {
  //       let contract = new Contract(
  //         factoryAddress,
  //         factoryAbi,
  //         PolygonProvider
  //       );
  //       if (chainId == 5) {
  //         contract = new Contract(
  //           factoryEthAddresss,
  //           factoryEthAbi,
  //           ETHProvider
  //         );
  //       } else if (chainId == 80001) {
  //         contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
  //       }
  //       const currentPeriod = await contract.get_CurrentPeriod();
  //       let IsRewardCollectedOfPeriod =
  //         await contract.IsRewardCollectedOfPeriod(currentPeriod);
  //       console.log("IsRewardCollectedOfPeriod", IsRewardCollectedOfPeriod);
  //       let givenTimestamp =
  //         await contract.get_TimeLimitForWinnerForCurrentPeriod();
  //       givenTimestamp = givenTimestamp.toNumber();
  //       console.log("givenTimestamp", givenTimestamp);
  //       const currentTimestamp = Math.floor(Date.now() / 1000);
  //       if (givenTimestamp < currentTimestamp && IsRewardCollectedOfPeriod) {
  //         console.log("The given timestamp is in the past.");
  //         setIsClaimEnables(false);
  //       }

  //       console.log("IsRewardCollectedOfPeriod", IsRewardCollectedOfPeriod);
  //     }
  //   } catch (error) {
  //     console.error("error while is reward claimed", error);
  //   }
  // };

  const withDrawLimitRender = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }) => {
    if (completed) {
      setIsClaimEnables(false);
      // isRewardClaimed();
      return (
        <div className="timer text-danger d-flex">Claim Time Finished</div>
      );
    } else {
      setIsClaimEnables(isClaimEnabled);
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
    // isRewardClaimed();
    // withDrawLimitRender()
    rewardHistory();
    getWinnerTime();
    claimButtonStatus();
  }, []);
  return (
    <>
      <FirstLanding />
      <div className="container-fluid  text-white dashboard">
        <div className="">
          {rewarArray.length > 0 ? (
            <ReactTooltip
              anchorId="app-title"
              place="bottom"
              content={
                <table>
                  <thead>
                    <tr>
                      <th>Token</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  {rewarArray?.map((item) => {
                    return (
                      <tbody>
                        <tr>
                          <th>{item.symbol}</th>
                          <th>{item.amount}</th>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              }
            />
          ) : (
            <ReactTooltip
              anchorId="app-title"
              place="bottom"
              content="No Reward Found."
            />
          )}

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
                  <h6 className="text-dark text-start">Remaining Time</h6>
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
                  <h6 className="text-dark">
                    Winner gets{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      className="text-primary fw-bold"
                      id="app-title"
                    >
                      this reward
                    </span>
                  </h6>
                  <p
                    className="text-dark mt-2 "
                    style={{ overflowWrap: "anywhere" }}
                  >
                    {winnerAddress == null ? <Skeleton /> : winnerAddress}
                  </p>
                </div>
                <div>
                  {winnerAddress != null ? (
                    <button
                      className={
                        !(winnerAddress == address && isClaimEnabled)
                          ? "btn btn-light btn_height"
                          : "btn btn-primary btn_height"
                      }
                      disabled={!(winnerAddress == address && isClaimEnabled)}
                      onClick={withDrawReward}
                    >
                      Claim
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
                <h5 className="text-center fw-bold">uTokens</h5>

                <Table borderless>
                  <thead>
                    <tr className="">
                      <th className="text-center">uAssets</th>
                      <th className="text-center">uWallet Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <img
                          src={logo1}
                          alt=""
                          className="img-fluid img_logo me-2"
                        />
                        {isConnected ? (
                          `u${chain.nativeCurrency.symbol}`
                        ) : (
                          <Skeleton />
                        )}
                      </td>
                      <td className="text-center">
                        {uNativeBal ? uNativeBal : <Skeleton />}
                      </td>
                      <td>
                        <AddTokenInWallet address={ethAddress} />
                        {/* <Button variant="primary" className="p-0">Add to Wallet</Button> */}
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
                          <div className="d-flex text-center justify-content-center">
                            <img
                              src={logo1}
                              alt=""
                              className="img-fluid img_logo me-2"
                            />
                            <td className="text-center">u{item.label}</td>
                          </div>

                          <td className="text-center">
                            {isConnected ? (
                              <UTokenBalance alternateAddress={item.address} />
                            ) : (
                              <Skeleton />
                            )}
                          </td>
                          <td>
                            <AddTokenInWallet address={item.address} />
                            {/* <Button variant="primary" className="p-0">Add to Wallet</Button> */}
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
                <h5 className="text-center fw-bold">Switch to uTokens</h5>
                <Table borderless>
                  <thead>
                    <tr>
                      <th className="text-center">Tokens</th>
                      <th className="text-center">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        {isConnected ? (
                          chain.nativeCurrency.symbol
                        ) : (
                          <Skeleton />
                        )}
                      </td>
                      <td className="text-center">
                        {nativeBal ? (
                          Number(nativeBal).toFixed(6)
                        ) : (
                          <Skeleton />
                        )}
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
    </>
  );
};

export default Dashboard;
