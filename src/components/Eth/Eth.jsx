import React from 'react'
import {AiOutlineCheck} from 'react-icons/ai'

import Accordion from "react-bootstrap/Accordion";
const Eth = () => {
 
  return (
    <div className='container pt-lg-5 pt-2 mt-lg-5 mt-0 pb-5 mtb-5'>
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
                          u369.eth is a public good born with… 
                          </Accordion.Header>
                          <Accordion.Body>  
                          born with the purpose and determination of enhancing the safety of the digital-assets industry, by implementing a non-upgradable smart contract <span className='fw-bold' data-toggle="tooltip" data-placement="top" title="The code is 100% immutable, with only one exception: adding ERC20 tokens or NFTs to be minted into uTokens. Once a token is added, it can't be removed.">(hint) </span>to provide you with an extra layer of protection to secure your digital assets (i.e., ETH, ERC20s and NFTs).</Accordion.Body>
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
                          self-sustained and self-organizing distributed system
                          </Accordion.Header>
                          <Accordion.Body>  
                          automatically giving away the smart contrac's revenue as follows:<br />
<AiOutlineCheck style={{color:"green"}}/> 30% to fund public goods <br />
<AiOutlineCheck style={{color:"green"}}/> 30% to reward its user-base<br />
<AiOutlineCheck style={{color:"green"}}/> 10% to benefact (A) developers and (B) organizations promoting society's moral & civic values <br />
<AiOutlineCheck style={{color:"green"}}/> 30% to u369.eth the public good itself</Accordion.Body>
                        </Accordion.Item>
                      </div>
                    </Accordion>
          
                </div>
              

        </div>
      
    </div>
  )
}

export default Eth
