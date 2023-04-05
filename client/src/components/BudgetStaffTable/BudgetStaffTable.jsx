import React from "react";
import "./index.css";
import { MdEdit } from "react-icons/md";
import { BsCloudDownload } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";

function BudgetStaffTable({ budgetData, setAddingData}) {
  return (
    <div className="staff-table-ctn">
      <div className="table-titles">
        <div>
          <h4>X</h4>
          <h4>Cargo</h4>
          <h4>Area</h4>
          <h4 className="text-center">Clasificación</h4>
          <h4 className="text-center">Cuenta</h4>
        </div>
      </div>
      <div className="table-values">
        {budgetData.map((m) => {
          return (
            <div key={m.id} className="staff-entry">
              <p>{m.id}</p>
              <p> {m.area} </p>
              <p>{m.position}</p>
              <p className="text-center">{m.classing}</p>
              <p className="text-center"> {m.account} </p>
              <a href="" className="settings">
                <MdEdit data-id={m.id} />
              </a>
            </div>
          );
        })}
      </div>
      <div className="table-footer">
        <div className="footer-btn add-staff">
          <a
            onClick={(e) => {
              e.preventDefault;
              setAddingData(true);
            }}
          >
            Añadir Personal +
          </a>
        </div>
        <div className="footer-btn download-staff">
          <a>Descargar CSV</a> <BsCloudDownload />
        </div>
        <div className="footer-btn upload-staff">
          <a>Subir CSV</a> <AiOutlineCloudUpload />
        </div>
      </div>
    </div>
  );
}

export default BudgetStaffTable;
