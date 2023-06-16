import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Mint from '../Mint/Mint';
import Transfer from '../Transfer/Transfer';
import logo1 from '../../assets/logo1.png'
import { useAccount, useChainId } from 'wagmi';
import { Contract, ethers } from "ethers";
import { factoryAddress, factoryEthAddresss } from '../../instances/addresses';
import factoryEthAbi from '../../instances/abis/factoryEthAbi.json';
import factoryAbi from '../../instances/abis/factoryAbi.json'
import PasswordModal from '../passwordModal/PasswordModal';
function TransferModal({symbol, transferType, tokenAddress}) {
  const ETHProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
);
const PolygonProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/"
);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [show1, setShow1] = useState(false);
const handleClose1 = () => setShow1(false);
const handleShow1 = () => setShow1(true);
const { address, isConnected } = useAccount();
const chainId = useChainId();
  const checkPassword = async () => {
    try {
        if ((isConnected && chainId == 5) || chainId == 80001) {
            let contract = null;
            if (chainId == 5) {
                contract = new Contract(factoryEthAddresss, factoryEthAbi, ETHProvider);
            } else if (chainId == 80001) {
                contract = new Contract(factoryAddress, factoryAbi, PolygonProvider);
            }
            let isPass = await contract.isPasswordSet(address);
            if (!isPass) {
                handleShow1();
            } else {
                handleShow();
            }
        }
    } catch (error) { 
        
    }
};
  return (
    <>
    <PasswordModal handleShow={handleShow} show={show1} handleClose={handleClose1} />
      <Button variant="primary" onClick={checkPassword}>
        Transfer
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
          
            Transfer <img src={logo1} alt="" className="img-fluid img_logo me-2" />u{symbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Transfer tokenAddress={tokenAddress} transferType={transferType} onHide={handleClose} /></Modal.Body>
      </Modal>
    </>
  );
}
export default TransferModal;