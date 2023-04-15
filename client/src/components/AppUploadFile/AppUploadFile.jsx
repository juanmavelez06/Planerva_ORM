import React, { useState } from "react";
import "./index.css";
import Swal from "sweetalert2";
import axios from "axios";
import { AiFillFileWord } from "react-icons/ai";
import {HiDocumentDuplicate} from "react-icons/hi"


function AppUploadFile({ updateFileData }) {
  const [File, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡No se seleccionó ningun archivo!",
      });
      return;
    }

    if (
      selectedFile.type !== "application/vnd.ms-excel" &&
      selectedFile.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      //MIME .XLS Y XLSX
      setFile(null);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡El archivo seleccionado no es un Excel!",
      });
      return;
    }

    const maxSize = 50 * 1024 * 1024; //50mb
    if (selectedFile.size > maxSize) {
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

  const handleUpload = (e) => {
    e.preventDefault(e);
    const formData = new FormData();
    formData.append("file", File);

    // todo - Hacer Control de Promesas
    axios
      .post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      .then((response) => {
        setFile(null);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Algo salió mal!",
        });
      });
  };

  return (
    <React.Fragment>
      <div className="container_all">
        <button className="contect_file">
          <AiFillFileWord className="icon" size={20} />
          Subir archivo
          <label htmlFor="btn_file"></label>
          <input
            type="file"
            id="btn_file"
            accept=".xlsx"
            onChange={handleFileChange}
          />
        </button>

        <div className="contect_btn">
          <button
            className="upload"
            onClick={async (e) => {
              handleUpload(e);
              // todo - Colocar una alerta para cuando los archivos se hayan subido éxitosamente
              Swal.fire(
                "Muy bien!",
                "El archivo se subio con Exito!",
                "success"
              );
              // todo - No setear set upload file como false hasta que la promesa esté resuelta
              setTimeout(() => {
                updateFileData();
              }, 1200);
            }}
          >
            Subir
          </button>

          <button className="cancel" onClick={updateFileData}>
            Regresar
          </button>
        </div>
      </div>

      <div className="content_img">
        <HiDocumentDuplicate className="img_optimal"/>
      </div>
    </React.Fragment>
  );
}

export default AppUploadFile;
