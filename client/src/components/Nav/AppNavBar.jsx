import React from 'react'
import './index.css'
import {AiFillHome } from "react-icons/ai"

function AppNavBar() {
  return (
    <div className='navBar'>
      <div className='ctn-navBar'>
        <div className='ctn-logo'>
          <h1>LOGO</h1>
        </div>
        <nav>
          <div> <AiFillHome></AiFillHome> </div>
          <div> <AiFillHome></AiFillHome> </div>
          <div> <AiFillHome></AiFillHome> </div>
        </nav>
      </div>
    </div>
  )
}

export default AppNavBar