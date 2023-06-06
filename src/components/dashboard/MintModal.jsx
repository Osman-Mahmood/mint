import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Mint from '../Mint/Mint';
import { useAccount, useBalance, useContractRead, erc20ABI, useChainId, useNetwork } from 'wagmi';

function MintModal({symbol, tokenAddress, mintType}) {
    const {isConnected } = useAccount()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} disabled={!isConnected}>
                Deposit 
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Protect your  {symbol}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Mint mintType={mintType} tokenAddress={tokenAddress} onHide={handleClose} />
                </Modal.Body>
            </Modal>
        </>
    );
}
export default MintModal;