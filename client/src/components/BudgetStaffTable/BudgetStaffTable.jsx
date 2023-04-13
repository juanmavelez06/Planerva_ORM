import React from "react";
import { useState } from "react";
import axios from "axios";
import "./index.css";
import { MdEdit, MdDelete, MdDeleteOutline } from "react-icons/md";
import { BsCloudDownload } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { deletePositionRequest } from "../../api/api";
import Swal from "sweetalert2";


function BudgetStaffTable({ budgetData, setAddingData, getData, editData }) {

  const [File, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if(!selectedFile){
      setFile(null);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡No se seleccionó ningun archivo!",    
      });
      return;
    }

    if(selectedFile.type !== "application/vnd.ms-excel" &&
    selectedFile.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { //MIME .XLS Y XLSX
      setFile(null);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡El archivo seleccionado no es un Excel!",    
      });
      return;
    }

    const maxSize = 50 * 1024 * 1024; //50mb
    if(selectedFile.size > maxSize){
      setFile(null);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡El archivo seleccionado excede el tamaño maximo!",    
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', File);

    axios.post('http://localhost:5000/upload', formData)
   
      .then(response => {
        console.log(response.data);
        setFile(null)
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Algo salió mal!",    
        });
      });
  };

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
        {budgetData.length > 0 ? (
          budgetData.map((m) => {
            return (
              <div key={m.id} className="staff-entry">
                <p>{m.id}</p>
                <p> {m.area} </p>
                <p>{m.position}</p>
                <p className="text-center">{m.classing}</p>
                <p className="text-center"> {m.account} </p>
                <div className="settings">
                  <a
                    href=""
                    onClick={async (e) => {
                      e.preventDefault();
                      editData(m);
                    }}
                    className="edit-entry"
                  >
                    <MdEdit data-id={m.id} />
                  </a>
                  <a
                    href=""
                    onClick={async (e) => {
                      e.preventDefault();
                      await deletePositionRequest(m.id);
                      await getData();
                    }}
                    className="remove-entry"
                  >
                    <MdDeleteOutline data-id={m.id} />
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <p>Añade Personal</p>
        )}
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
          <form>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <button onClick={handleUpload}>Subir</button>
          </form>
          <AiOutlineCloudUpload />
        </div>
      </div>
    </div>
  );
}

export default BudgetStaffTable;