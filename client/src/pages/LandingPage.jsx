import React from 'react'
import AppModules from '../components/AppModules/AppModules'
import AppModuleCard from '../components/AppModuleCard/AppModuleCard';
import Nav from "../components/Nav/Nav";
import AppNavBar from "../components/AppNavBar/AppNavBar";
import AppHeader from "../components/AppHeader/AppHeader";
import { AiFillPieChart, AiFillHome } from 'react-icons/ai'

function LandingPage() {
  return (
    <React.Fragment>
      {/* Nav Portal */}
      <Nav>
        <AppNavBar>
          <div> <AiFillHome></AiFillHome> </div>
          <div> <AiFillHome></AiFillHome> </div>
          <div> <AiFillHome></AiFillHome> </div>
        </AppNavBar>
      </Nav>

      {/*App Header*/}
      <AppHeader sectionName={"Next Level Accounting"}></AppHeader>

      <AppModules>
        <AppModuleCard link={"/budget"} Icon={AiFillPieChart} moduleName={"Budget"}/>
        <AppModuleCard Icon={AiFillPieChart} moduleName={"Budget"} />
        <AppModuleCard Icon={AiFillPieChart} moduleName={"Budget"} />
        <AppModuleCard Icon={AiFillPieChart} moduleName={"Budget"} />
        <AppModuleCard Icon={AiFillPieChart} moduleName={"Budget"} />
        <AppModuleCard Icon={AiFillPieChart} moduleName={"Budget"} />
        <AppModuleCard Icon={AiFillPieChart} moduleName={"Budget"} />
        <AppModuleCard Icon={AiFillPieChart} moduleName={"Budget"} />
      </AppModules>
    </React.Fragment>
  )
}

export default LandingPage