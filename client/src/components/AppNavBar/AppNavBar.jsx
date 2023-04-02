import React from 'react'
import './index.css'

function AppNavBar({children}) {
  return (
    <div className='navBar'>
      <div className='ctn-navBar'>
        <div className='ctn-logo'>
          <h1>LOGO</h1>
        </div>
        <nav>
          {children}
        </nav>
      </div>
    </div>
  )
}

export default AppNavBar