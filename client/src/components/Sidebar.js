import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import NavBar from "./Navbar";
import MyTable from "./Table";
import Card from "./Card";
import {
  faArrowRightLong,
  faHouse,
  faChartSimple,
  faBars,
  faUser,
  faChartLine,
  faRightFromBracket,
  faSun,
  faMoon,
  
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const navigate = useNavigate();
  const [close, setClose] = useState(false);

  const handleClick = () => {
    setClose(!close)
  }

  

  return (
    <div className="light-theme">
      <nav className={close ? "sidebar close" : "sidebar"}>
        <header>
          <div className="image-text">
            <span className="image"></span>
            <img src={Logo} classNameName="logo_sidebar" alt="Logo"></img>
            <div className="text logo-text">
              <span className="name">Planerva</span>
            </div>
          </div>
          {/* onClick={() =>  setClose(true)} */}
          <i className="toggle" onClick={handleClick}>
            <FontAwesomeIcon icon={faArrowRightLong} />
          </i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="box_open">
             
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <Link>
                  <i className="icon">
                    <FontAwesomeIcon icon={faHouse} />
                  </i>
                  <span className="text nav-text">Dashboard</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link>
                  <i className=" icon">
                    <FontAwesomeIcon icon={faBars} />
                  </i>
                  <span className="text nav-text">Home</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link>
                  <i className=" icon">
                    {" "}
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                  <span className="text nav-text">Users</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link>
                  <i className="icon">
                    <FontAwesomeIcon icon={faChartSimple} />
                  </i>
                  <span className="text nav-text">Graphic</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link>
                  <i className="icon">
                    {" "}
                    <FontAwesomeIcon icon={faChartLine} />{" "}
                  </i>
                  <span className="text nav-text">Table Graphic</span>
                </Link>
              </li>
              <li >
              <Link>
                <i className="icon">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </i>
                <span className="text " >
                  Logout
                </span>
              </Link>
            </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <section className="home">
        <NavBar></NavBar>
      </section>
      <section className="home2">
        <MyTable></MyTable>
      </section>
      <section className="home3" >
      <Card></Card>
      </section>
    </div>
  );
}

export default Sidebar;
