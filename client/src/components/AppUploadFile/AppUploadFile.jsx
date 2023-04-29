import React, { useState } from "react";
import "./index.css";
import Swal from "sweetalert2";
import axios from "axios";
import { AiFillFileWord } from "react-icons/ai";
import { HiDocumentDuplicate } from "react-icons/hi";
import * as XLSX from "xlsx";


function AppUploadFile({ updateFileData }) {
  const [File, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    e.preventDefault();

    if (!File) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡No se seleccionó ningún archivo!",
      });
      return;
    }

    const requiredFields = ["position", "classing", "account"]; //!Nombre de los datos especificos que no quiero esten vacios 

    function hasEmptyFields(data) {
      const hasEmpty = data.some((row) => {
        return requiredFields.some((column) => {
          const value = row[column];
          return value === undefined || value === null || value === "";
        });
      });
      return hasEmpty;
    }

    const readFile = new FileReader();
    readFile.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log("Data:", data);

      if (hasEmptyFields(data)) {
        console.log("Hay campos vacíos en el archivo");
        Swal.fire(
          "¡Error!",
          "¡El archivo no se subió debido a que tiene campos vacíos!",
          "error"
        );
        return;
      }
      setUploading(true);
      const formData = new FormData();
      formData.append("file", File);

      axios
        .post(`${import.meta.env.VITE_MICROSERVICE_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          setFile(null);
          Swal.fire("¡Muy bien!", "¡El archivo se subió con éxito!", "success");
          setTimeout(() => {
            updateFileData();
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Algo salió mal!",
          });
        })
        .finally(() => {
          setUploading(false);
        });
    };
  
    readFile.readAsBinaryString(File);
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
            }}
            disabled={uploading}
          >
            {uploading ? "Subiendo..." : "Subir"}
          </button>

          <button className="cancel" onClick={updateFileData}>
            Regresar
          </button>
        </div>
      </div>

      <div className="content_img">
        <HiDocumentDuplicate className="img_optimal" />
      </div>
    </React.Fragment>
  );
}

export default AppUploadFile;