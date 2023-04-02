import React from 'react'
import {Link} from "react-router-dom" 
import "./index.css"

function AppModuleCard({link, Icon, moduleName}) {
  return (
    <Link to={link} className='module-card'>
      <Icon></Icon>
      <h4>{moduleName} </h4>
    </Link>
  )
}

export default AppModuleCard