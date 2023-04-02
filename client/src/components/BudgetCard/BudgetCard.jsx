import React from "react";
import "./index.css";

function BudgetCard({Icon, title, legend, data}) {
  return (
    <div className="budget-card">
      <div className="budget-card-ctn">
        <div className="card-icon-ctn">
          <Icon></Icon>
        </div>
        <div className="card-content-ctn">
          <p>{title}</p>
          <span>{legend ? legend : ''}</span>

          <div className="data">
            <p>{data}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetCard;
