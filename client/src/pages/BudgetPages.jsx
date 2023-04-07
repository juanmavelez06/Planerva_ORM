import React from 'react'
import Nav from '../components/Nav/Nav'
import AppNavBar from '../components/AppNavBar/AppNavBar'
import AppHeader from '../components/AppHeader/AppHeader';
import BudgetStaff from '../components/BudgetStaff/BudgetStaff'
import {FiUsers} from 'react-icons/fi';
import {AiFillHome} from 'react-icons/ai'
import {RxDashboard} from 'react-icons/rx'
import {MdOutlineInventory} from 'react-icons/md'
import { Routes, Route, Link } from "react-router-dom";

function BudgetPages() {
  return (
    <React.Fragment>
      {/* Nav Portal */}
      <Nav>
        <AppNavBar>
          <Link to={"/"}><AiFillHome/></Link>
          <Link to={"/budget"}><RxDashboard/></Link>
          <Link to={"./staff"}><FiUsers/></Link>
          <Link to={"./inventory"}><MdOutlineInventory/></Link>
        </AppNavBar>
      </Nav>

      {/*App Header*/}
      <AppHeader sectionName={"Presupuesto"}></AppHeader>

      <Routes>
        <Route path='/staff' element={<BudgetStaff/>}/>
      </Routes>
    </React.Fragment>
  )
}

export default BudgetPages