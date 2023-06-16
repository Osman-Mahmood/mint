import React from 'react'
import intro from '../../assets/intro.jpg'
import '../style.css'

import Accordion from "react-bootstrap/Accordion";
const Intro = () => {


  return (
    <div className='container-fluid p-5  text-white pb-3'>
      {/* <img className='w-100 img-fluid intro_img' src={intro} alt="" /> */}
      {/* <h1 className='text-white intro_text'>Distributed systems <br />
        & <br />
        Human Coordination
      </h1> */}
      <div className='row'>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={0}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (1)
                  Constantly, the u369.eth smart contract
                </Accordion.Header>
                <Accordion.Body>(i) Protects your digital assets from being stolen, <br /> (ii) Reward its users and <br /> (iii) Fund public goods ✨
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={1}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (2)
                  When you connect your wallet for the first time
                </Accordion.Header>
                <Accordion.Body> You are provided with a one-time randomly-generated and encrypted 32-charachters-string (i.e., a Master Key) ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={2}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (3)
                  Once you have saved your Master Key someplace safe
                </Accordion.Header>
                <Accordion.Body>You can proceed to protect your digital assets: (A) Create a password, (B) Confirm the password (C) sign an on-chain Tx to set password, and (D) Supply any amount of ETH or any amount of ERC20 from this list ✨

                  Note: The Master Key provided in the beginning is the unique authentication code to reset/change or bypass the password you created. PLEASE DO NOT LOSE YOUR MASTER KEY, OTHERWISE YOUR FUNDS WILL BE STUCK FOREVER IN THE SMART CONTRACT if you ever forget or lose the password you created ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={3}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (4)
                  Upon supplying your native digital asset into the smart contract
                </Accordion.Header>
                <Accordion.Body> 0.369% of the deposited amount is automatically collected by u369.eth smart contract.

                  The remaining amount would remain locked under your power and the smart contract will automatically issue/mint a 1:1 wrapped version of the deposited/locked ETH or ERC20.

Exegesis: If you supplied/locked 1.369 ETH >> the smart contract will collect the 0.369% ETH as fee and will issue to your wallet 1 uETH (it can be read as is "1 uETH" or as "1 unstealable ETH") ✨
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
      </div>
      <div className='row mt-3'>

        <div className='col-lg-3 col-sm-12'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={4}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (5)
                  When wrapping ETH or ERC20, the smart contract
                </Accordion.Header>
                <Accordion.Body> Automatically collects 0.369% from the  respective supplied/locked token ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={5}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (6)
                  The 0.369% collected by the smart contract is a ,
                </Accordion.Header>
                <Accordion.Body>
                  Benefaction-fee, used to fund public goods, to reward participants, to sustain u369.eth ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={6}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (7)
                  The benefaction-fee is distributed as follows
                </Accordion.Header>
                <Accordion.Body>
                  <br />30% to fund public goods ✨<br />
                  30% to reward 1 participant every 369 hours ✨ <br />
                  30% to sustain u369.eth and  <br />
                  10% to developers and any organizations promoting/helping with moral & civic values ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={7}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (8)
                  After wrapping the native tokens into uTokens
                </Accordion.Header>
                <Accordion.Body>
                  For example uETH if ETH is locked or ustETH if stETH is locked; it becomes extremely difficult for any bad actor to steal the wrapped uTokens.

                  To move/transfer your uTokens, the bad actor would also need to have your password or unique authentication code (Master Key); without the password or the Master Key, it is impossible to move your uTokens, even if the bad actor has gained access to your wallet's private keys ✨ ✨ ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
      </div>

      <div className='row mt-3'>


        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={8}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (9)
                  Only the rightful owners of uTokens can
                </Accordion.Header>
                <Accordion.Body>
                  Transfer their uTokens to any 0X address, and also can claim the native tokens held inside the u369.eth smart contract.

                  To transfer uTokens: (A) the owner comes to the u369.eth smart-contract interface, (B) Clicks on "Transfer", (C) Inputs the amount to transfer and inputs their password, (D) Signs the on-chain Tx to send the uTokens ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={9}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (10)
                  Any new owner/recipient of uTokens can transfer them
                </Accordion.Header>
                <Accordion.Body>
                  If the new owner of the uToken(s) Comes for the first time to the u369.eth interface, they shall perform the steps provided in point 3 above and proceed to transfer their uTokens ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={10}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (11)
                  Any new owner/recipient of the uTokens can claim
                </Accordion.Header>
                <Accordion.Body>
                  The protected native tokens by clicking the "Claim" button/function to claim/redeem the native tokens ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
        <div className='col-lg-3 col-sm-12 mt-2 mt-lg-0'>
          <Accordion className="accordion-bg">
            <div className="col-md-12">
              <Accordion.Item
                eventKey={11}
                className=" accordion-bg"
              >
                <Accordion.Header className=" accordion-bg">
                  (12)
                  To redeem or claim the protected native tokens
                </Accordion.Header>
                <Accordion.Body>
                  (A) The owner of the uTokens sends the amount of uTokens they want to unlock to the smart contract (B) the smart contract burns the uTokens and automatically releases the native protected tokens to the correspondent 0x address.

Example: 1ETH locked >> owner of the 1uETH clicks on "Claim" button >> the owner must input the amount to redeem, input their password >> and sign the on-chain Tx to send the 1uETH to the contract (sender pays validators/network fee to process the Tx) >> smart-contract burns the 1 uETH and releases the 1ETH to the designated 0x address ✨</Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>

        </div>
      </div>



    </div>

  )
}

export default Intro