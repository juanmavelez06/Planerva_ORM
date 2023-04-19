import React from "react";
import "./index.css";
import { AiOutlineUser } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";

function AppHeader({ sectionName }) {
  return (
    <div className="header-ctn">
      <div className="section-title">
        <h1>Planerva</h1>
        <h2>{sectionName}</h2>
      </div>

      <div className="header-user">
        <div className="ctn-user">
          <div>
            <AiOutlineUser />
          </div>
        </div>
        <RiArrowDropDownLine />
      </div>
    </div>
  );
}

export default AppHeader;
