import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useAccount, useBalance, useContractRead, erc20ABI, useChainId, useNetwork } from 'wagmi';
import { Contract, ethers } from 'ethers';
import { IoWarningOutline } from "react-icons/io5"
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai"
import { FiCopy } from "react-icons/fi"
import { factoryAddress, factoryEthAddresss } from "../../instances/addresses"
import factoryAbi from "../../instances/abis/factoryAbi.json";
import factoryEthAbi from "../../instances/abis/factoryEthAbi.json"
import { useSelector } from 'react-redux';
export default function PasswordModal({ show, handleClose }) {
    // const { address, isConnecting, isDisconnected, isConnected } = useAccount();
    const chainId = useChainId();
    const generateRandomString = () => {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < 32; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        return randomString;
    };
    const [phrase, setPhrase] = useState(generateRandomString())
    const [isSeePass, setIsSeePass] = useState(false)
    const [isSeeCPass, setIsSeeCPass] = useState(false)
    const seePass = (e) =>{
        e.preventDefault();
        setIsSeePass(!isSeePass)
    }
    const seeCPass = (e) =>{
        e.preventDefault();
        setIsSeeCPass(!isSeeCPass)
    }
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
    const savePssword = async () => {
        try {
            if (chainId == 5 || chainId == 80001) {
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
            let contract = null
            let provider = new ethers.providers.Web3Provider(window.ethereum);
            let signer = provider.getSigner();
        if (chainId == 5) {
          contract = new Contract(factoryEthAddresss, factoryAbi, signer);
        } else if (chainId == 80001) {
          contract = new Contract(factoryAddress, factoryAbi, signer);
        }
        const tx =  await contract.setPasswordAndRecoveryNumber(password, phrase);
        console.log("tx", tx);
        let receipt = await tx.wait();
            handleClose()
            return
        }
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
                    <h3>Set Password</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Phrase</Form.Label>
                            <div className='d-flex'>

                                <Form.Control 
                                    className='w-75'
                                    value={phrase}
                                    readOnly
                                    disabled    
                                    type="password"
                                />
                                <button className='w-25 btn btn-light border rounded ms-1'
                                    onClick={(e) => copyPhrase(e)}
                                ><FiCopy /></button>
                            </div>

                            <Form.Text className=" text-warning">
                                <IoWarningOutline /> This recevery phrase is shown ones please save it and use it to recever your password.
                                If you lost it you will never be able to recver to you password and perform any transaction on this platform.
                            </Form.Text>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <div className='d-flex'>
                            <Form.Control
                            className='w-75'
                            type={isSeePass ? "text" : "password"}
                            placeholder="Password"
                                onChange={(e) => {
                                    setPass({ ...pass, password: e.target.value })
                                }}
                            />
                            <button className='w-25 btn btn-light border rounded ms-1'
                                    onClick={(e) => seePass(e)}
                                >
                                    {
                                        isSeePass ? <AiFillEyeInvisible/> : <AiFillEye />
                                    }
                                    
                                    </button>
                                </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <div className='d-flex'>
                            <Form.Control 
                            type={isSeeCPass ? "text" : "password"}
                             placeholder="Confirm Password"
                            className='w-75'
                                onChange={(e) => {
                                    setPass({ ...pass, confirmPassword: e.target.value })
                                }}
                            />
                            {
                                isShowMessage && <Form.Text className='text-danger'>
                                    {message}
                                </Form.Text>
                            }
                             <button className='w-25 btn btn-light border rounded ms-1'
                                    onClick={(e) => seeCPass(e)}
                                >
                                   {
                                        isSeeCPass ? <AiFillEyeInvisible/> : <AiFillEye />
                                    }
                                    </button>
                                </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={savePssword}>
                        Save Password
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

