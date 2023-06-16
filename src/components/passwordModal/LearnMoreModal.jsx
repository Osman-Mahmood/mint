import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Claim from '../Claim/Claim';

function LearnMore() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <span variant="primary" className="ms-4 text-primary border-primary border-2 border-bottom" 
      style={{cursor:"pointer"}}
      onClick={handleShow}>
      Learn More
      </span>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Note!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Only you with your password have access to your funds: To transfer and/or withdraw them.

When resetting your password for the u369.eth smart contract, you will need your Master Key. If you do not have your Master Key saved someplace safe, you will not be able to reset your password otherwise and will risk having the funds locked out permanently.</Modal.Body>
      </Modal>
    </>
  );
}
export default LearnMore;