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
                          The u369.eth smart contract works 
                          </Accordion.Header>
                          <Accordion.Body>The u369.eth smart contract works 365 24/7 to protect your digital assets from being stolen, to reward its users and to fund public goods.</Accordion.Body>
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
                          <Accordion.Body>you are presented with a one-time randomly-generated and encrypted-32-charachters-string (i.e., a Master Key).

YOU MUST COPY & SAVE YOUR MASTER KEY IN A SAFE PLACE AND DO NOT LOSE IT.</Accordion.Body>
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
                          Once you have saved your Master Key, you can proceed to protect your digital assets
                          </Accordion.Header>
                          <Accordion.Body> (A) create a password <br /> (B) confirm the password and <br /> (C) supply any amount of ETH, or any amount of ERC20 / NFTs from this list (the two words  <span className='fw-bold' data-toggle="tooltip" data-placement="top" title="The code is 100% immutable, with only one exception: adding ERC20 tokens or NFTs to be minted into uTokens. Once a token is added, it can't be removed.">("the list") </span> will be a hint or hyperlink that when the user hovers their mouth over it will show a pop-up with the list of the supported tokens and NFTs -this time we will only add the list of tokens, the NFTs we will add later).
<br /><strong>Note:</strong> The Master Key provided in the beginning is the unique authentication code to reset/change or bypass the password you created. PLEASE DO NOT LOSE YOUR MASTER KEY, OTHERWISE YOUR FUNDS WILL BE STUCK FOREVER IN THE SMART CONTRACT if you ever forget or lose the password you created.</Accordion.Body>
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
                          Upon depositing your native digital asset into the smart contract
                          </Accordion.Header>
                          <Accordion.Body>  the 0.369% of the deposited amount will be automatically collected by u369.eth smart contract.
<br />The remaining amount would remain locked under your power and the smart comntract will automatically issue/mint a 1:1 wrapped version/representation of the deposited/locked token or NFT.

Exegesis: If you supplied/locked 1.369 ETH  the smart contract will collect the 0.369% ETH as fee and will issue to your wallet 1 uETH (it can be read as is "1 uETH" or as "1 unstealable ETH".</Accordion.Body>
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
                          The 0.369% collected by the smart contract
                          </Accordion.Header>
                          <Accordion.Body>  The 0.369% collected by the smart contract is a benefaction-fee, used to fund public goods and to reward participants.</Accordion.Body>
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
                          When wrapping ETH or ERC20,
                          </Accordion.Header>
                          <Accordion.Body>  When wrapping ETH or ERC20, the smart contract will collect the 0.369% benefaction-fee from the supplied/locked token(s)</Accordion.Body>
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
                          The collected fee is distributed as follows:
                          </Accordion.Header>
                          <Accordion.Body>  
<br />30% to fund public goods <br />
30% to reward 1 user every 369 hours <br />
30% to sustain u369.eth and <br />
10% to developers and to any organization promoting/helping with moral & civic values</Accordion.Body>
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
                          After wrapping the native tokens into uTokens (unstealable tokens, (for example uETH if ETH is locked or ustETH if stETH is locked), it becomes exteremely difficult for any bad actor to steal them. 

To move/transfer your uTokens, the bad actor would also need to have your password or unique authentication code (Master Key); without the password or the Master Key, it is impossible to move your uTokens, even if the bad actor has gained access to your wallet's private keys.</Accordion.Body>
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
                          Only the legit owners of uTokens
                          </Accordion.Header>
                          <Accordion.Body>  
                          Only the legit owners of uTokens can send their uTokens to any 0x address. To transfer uTokens: (a) the owner comes to the u369.eth smart-contract interface, (b) clicks on "Transfer", (c) inputs the amount to transfer and inputs their password, (d) signs the Tx to send the uTokens.</Accordion.Body>
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
                          Any new owner/recipient of the uTokens
                          </Accordion.Header>
                          <Accordion.Body>  
                          Any new owner/recipient of the uTokens can also transfer their uTokens. They just come to the u369.eth smart-contract interface and use the "Transfer" function to send uTokens. To transfer uTokens >> the new owner of the uToken(s) when coming to the u369.eth interface will receive a Master Key >>copy and save their Master Key in a safe place >> create and confirm a password >> and now the new ower of uTokens can transfer them.</Accordion.Body>
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
                          Only the legit owner(s) of the uTokens can reedem
                          </Accordion.Header>
                          <Accordion.Body>  
                          Only the legit owner(s) of the uTokens can reedem the protected native tokens. The minter or any new owner of uToken(s) can interact with the "Claim" button/function to claim/redeem the protected native tokens.</Accordion.Body>
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
                          To reedem or claim the protected native tokens
                          </Accordion.Header>
                          <Accordion.Body>  
                          To reedem or claim the protected native tokens >> the owner of the uTokens sends the amount of uTokens they want to unlock to the smart contract >> the smart contract burns the uTokens and automatically releases the native protected tokens to the correspondent 0x address.

Example: 1ETH locked >> owner of the 1uETH clicks on "Claim" button >> the owner must input the amount to redeem, input their password >> and sign the Tx to send the 1uETH to the contract (sender pays validators/network fee to process the Tx) >> smart-contract burns the 1 uETH and releaes the 1ETH to the designated 0x address.</Accordion.Body>
                        </Accordion.Item>
                      </div>
                    </Accordion>
     
        </div>
        </div>
    
       
       
      </div>
  
  )
}

export default Intro
