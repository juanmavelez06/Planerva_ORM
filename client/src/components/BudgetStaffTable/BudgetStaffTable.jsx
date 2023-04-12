import React from "react";
import { useState } from "react";
import axios from "axios";
import "./index.css";
import { MdEdit, MdDelete, MdDeleteOutline } from "react-icons/md";
import { BsCloudDownload } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { deletePositionRequest } from "../../api/api";
import Swal from "sweetalert2";
import fs from 'fs'

function BudgetStaffTable({ budgetData, setAddingData, getData, editData }) {

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData)

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData); 
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Archivo enviado exitosamente");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Algo salió mal!",
          footer: '<a href="https://www.youtube.com/watch?v=KUOXSgK5684">Why do I have this issue?</a>',
        });
        console.log("Error al enviar el archivo:", response.statusText);
      }
    } catch (error) {
      alert("Error fuera de la carga",error);
      console.log(error)
    }
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
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} name="file" />
            <button type="submit">Enviar</button>
          </form>
          <AiOutlineCloudUpload />
        </div>
      </div>
    </div>
  );
}

export default BudgetStaffTable;
