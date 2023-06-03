import React from 'react'
import intro from '../../assets/intro.jpg'
import '../style.css'
const Intro = () => {
  return (
    <div className='container-fluid p-5  text-white pb-3'>
      {/* <img className='w-100 img-fluid intro_img' src={intro} alt="" /> */}
      {/* <h1 className='text-white intro_text'>Distributed systems <br />
        & <br />
        Human Coordination
      </h1> */}
      <h6 className='mt-5'>Steps to earn Crypto:</h6>
      <p>1. Select the Product_With_Purpose that you want your slogan/picture/design to be <br /> uploaded to.</p>
      <p>2. Upload your Slogan/Image/design on any of the Product_With_Purpose AND PROVIDE <br /> your telegram,twitter,discord (for example:@satoshi)</p>
      <p>3. Click on Activate contract to display you a one time code.copy<br />the code.go to your social media link.Paste the code on the @bot to activate the contract</p>
       <p>4. The website will show the options to pay $1.0 for upload moderation(pay with crypto) etc</p>
    </div>
  )
}

export default Intro

