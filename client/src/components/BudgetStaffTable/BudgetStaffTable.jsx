import React from "react";
import "./index.css";
import { MdEdit, MdDelete, MdDeleteOutline } from "react-icons/md";
import { BsCloudDownload } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { deletePositionRequest } from "../../api/api";
import Swal from "sweetalert2";

function BudgetStaffTable({
  budgetData,
  setAddingData,
  getData,
  editData,
  setUploadFile,
}) {

  //!Funcion para confirmar el eliminado de datos 
  const handleDelete =  async (id) => {
  const result = await Swal.fire ({
      title: "¿Estás seguro?",
      text: "El archivo se eliminará permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
  });
    if (result.isConfirmed){
      try{
        await deletePositionRequest(id);
        await getData();
      }catch (error) {
        Swal.fire("Eliminando", "Archivo eliminado con exito")
      }
    }
  };
  return (
    <div className="staff-table-ctn">
      <div className="table-titles">
        <div>
          <h4>X</h4>
          <h4>Área</h4>
          <h4>Cargo</h4>
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
                      handleDelete(m.id);
                      // await deletePositionRequest(m.id);
                      // await getData();
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
          <a
            onClick={(e) => {
              e.preventDefault();
              setUploadFile(true);
            }}
          >
            Subir CSV
          </a>{" "}
          <AiOutlineCloudUpload />
        </div>
      </div>
    </div>
  );
}

export default BudgetStaffTable;
