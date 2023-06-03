import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { IoWarningOutline } from "react-icons/io5"
import { FiCopy } from "react-icons/fi"
import { factoryAddress, factoryEthAddresss } from "../../instances/addresses"
import factoryAbi from "../../instances/abis/factoryAbi.json";
import { useSelector } from 'react-redux';
import  toast from 'react-hot-toast';
import { useAccount, useBalance, useContractRead, erc20ABI, useChainId, useNetwork } from 'wagmi';
import { Contract, ethers } from 'ethers';
export default function RecoverPasswordModal({ show, handleClose }) {
   const { address, isConnecting, isDisconnected, isConnected } = useAccount();
   const chainId = useChainId();
    const [phrase, setPhrase] = useState("")
    const [isEnable, setIsEnable] = useState(false)
    const copyPhrase = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(phrase)
    }
    const [pass, setPass] = useState({
        password: "",
        confirmPassword: ""
    })
    const [isShowMessage, setIsShowMessage] = useState(false)
    const [message, setIsMessage] = useState("")
    const checkPhrase = async (value) => {
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
            let isTrue = await contract.isRecoveryNumberCorrect(address, value)
            
            if (!isTrue) {
                setIsMessage("Enter correct phrase")
                setIsShowMessage(true)
            }else{
                setPhrase(value)
                setIsMessage("")
                setIsShowMessage(false)
                setIsEnable(true)
            }
        }
        } catch (error) {
            console.error("error while check phrase", error);
        }
    }
    const savePssword = async () => {
        try {
            let { password, confirmPassword } = pass;
            if (password === null || password === undefined || password === ""
                || confirmPassword === null || confirmPassword === undefined || confirmPassword === ""
            ) {
                setIsMessage("Password is mendatory")
                setIsShowMessage(true)
                return
            }
            if (password !== confirmPassword) {
                setIsMessage("Password does't match")
                setIsShowMessage(true)
                return
            }
            setIsMessage("")
            setIsShowMessage(false)
            let contract = null
            let provider = new ethers.providers.Web3Provider(window.ethereum);
            let signer = provider.getSigner();
        if (chainId == 5) {
          contract = new Contract(factoryEthAddresss, factoryAbi, signer);
        } else if (chainId == 80001) {
          contract = new Contract(factoryAddress, factoryAbi, signer);
        }

          let tx = await contract.changePassword(phrase, password);
          await tx.wait()
            handleClose()
            return
        } catch (error) {
            console.error("error while save password", error);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Alert!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Recover Password</h3>
                    <Form>
                        {!isEnable && <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phrase</Form.Label>
                            

                                <Form.Control type="text"
                                    className='w-100'
                                    
                                    disabled={!isConnected}
                                    onChange={(e)=>checkPhrase(e.target.value)}
                                />
                                {
                                isShowMessage && <Form.Text className='text-danger'>
                                    {message}
                                </Form.Text>
                            }
                            

                        </Form.Group>}

                        {isEnable && <><Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"
                                onChange={(e) => {
                                    setPass({ ...pass, password: e.target.value })
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password"
                                onChange={(e) => {
                                    setPass({ ...pass, confirmPassword: e.target.value })
                                }}
                            />
                            {
                                isShowMessage && <Form.Text className='text-danger'>
                                    {message}
                                </Form.Text>
                            }
                        </Form.Group> </>}
                    </Form>
                </Modal.Body>
                {isEnable &&<Modal.Footer>
                    <Button variant="primary" onClick={savePssword}>
                        Update Password
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>}
            </Modal>
        </>
    );
}

