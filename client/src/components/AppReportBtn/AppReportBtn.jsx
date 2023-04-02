import React from "react";
import "./index.css";
import { AiFillHome, AiOutlineCloudDownload } from "react-icons/ai";

function AppReportBtn() {
  return (
    <div className="AppReportBtn">
      <div className="report-btn-ctn">
        <div className="report-menu-btn">
          <p>Menu</p> <AiFillHome />
        </div>
        <div className="report-download-btn">
          <p>Download Report</p> <AiOutlineCloudDownload />
        </div>
      </div>
    </div>
  );
}

export default AppReportBtn;
