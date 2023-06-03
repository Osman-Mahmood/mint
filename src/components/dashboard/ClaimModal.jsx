import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Claim from '../Claim/Claim';

function ClaimModal({symbol, claimType, tokenAddress}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Claim
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Claim  U-{symbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Claim  tokenAddress={tokenAddress} claimType={claimType} onHide={handleClose} /></Modal.Body>
      </Modal>
    </>
  );
}
export default ClaimModal;