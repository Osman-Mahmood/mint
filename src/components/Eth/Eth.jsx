import React from 'react'
import {AiOutlineCheck} from 'react-icons/ai'

import Accordion from "react-bootstrap/Accordion";
const Eth = () => {
 
  return (
    <div className='container pt-lg-5 pt-2 mt-lg-5 mt-0 pb-5 pb-lg-5 mtb-5'>
        <div className='row'>
            <div className='col-lg-6'>
                {/* <ul className='box p-5 text-dark fs-5'>
                    <li> <strong>An open-source and non-custodial public good >></strong> born with the purpose and determination of enhancing the digital asset industry.</li>
                    <li><strong>A self-organizing distributed system >></strong>  using 40% of the smart contract's revenue to fund Public Goods.</li>
                    <li><strong>A self-sustained ecosystem >> </strong>using 30% of the smart contract's revenue to reward its end-users.</li>
                  
                </ul> */}
                  <Accordion className="accordion-bg">
                      <div className="col-md-12">
                        <Accordion.Item
                          eventKey={0}
                          className=" accordion-bg"
                        >
                          <Accordion.Header className=" accordion-bg">
                         u369.eth is a public good born with purpose and >>
                          </Accordion.Header>
                          <Accordion.Body>  
                          determination to enhance the safety of the cryptographic digital assets, by implementing a non-upgradeable smart contract to provide you with an extra layer of protection .

u369.eth smart contract is immutable. The append-only exception is exclusively to add new tokens. Once a token is added, it can’t be deleted. Tokens and uTokens can be switched back and forth, at will and without permission.
</Accordion.Body>
                        </Accordion.Item>
                      </div>
                    </Accordion>
          
                </div>
                <div className='col-lg-6 mt-3 mt-lg-0'>
                <Accordion className="accordion-bg">
                      <div className="col-md-12">
                        <Accordion.Item
                          eventKey={0}
                          className=" accordion-bg"
                        >
                          <Accordion.Header className=" accordion-bg">
                          A self-sustained and self-organizing distributed system >> 
                          </Accordion.Header>
                          <Accordion.Body>  
                          An open-source smart contract
A non-custodial protocol that aims to make the cryptographic digital assets hacker-proof.
The U in uTokens stands for “unstealable”, “unhackable”.
All these points in bold below are to left out as we mention it in the “How it works” so we will be removing them from there
<br />
                           Giving away the smart contract’s fees as follows:<br />
<AiOutlineCheck className='me-1' style={{color:"green"}}/> 30% to fund public goods (10% to the protocolguild.eth; 10% to giveth; 10% to orgs promoting/distilling moral & civic values) <br />
<AiOutlineCheck className='me-1' style={{color:"green"}}/>30% to programmatically reward its user-base<br />
<AiOutlineCheck className='me-1' style={{color:"green"}}/>10% for developers & educators<br />
<AiOutlineCheck className='me-1' style={{color:"green"}}/>30% to u369.eth the public good itself</Accordion.Body>
                        </Accordion.Item>
                      </div>
                    </Accordion>
          
                </div>
              

        </div>
      
    </div>
  )
}

export default Eth
