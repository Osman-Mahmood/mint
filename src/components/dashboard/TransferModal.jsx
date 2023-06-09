import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Mint from '../Mint/Mint';
import Transfer from '../Transfer/Transfer';

function TransferModal({symbol, transferType, tokenAddress}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Transfer
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Transfer u{symbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Transfer tokenAddress={tokenAddress} transferType={transferType} onHide={handleClose} /></Modal.Body>
      </Modal>
    </>
  );
}
export default TransferModal;