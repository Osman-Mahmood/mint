import React from 'react'
import intro from '../../assets/intro.jpg'
import '../style.css'
const Intro = () => {
  return (
    <div className='container-fluid p-0'>
      <img className='w-100 img-fluid intro_img' src={intro} alt="" />
      <h1 className='text-white intro_text'>Distributed systems <br />
        & <br />
        Human Coordination
      </h1>
    </div>
  )
}

export default Intro
