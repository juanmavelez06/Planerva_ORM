import React, { useState } from "react";
import "./index.css";
import Swal from "sweetalert2";
import axios from "axios";

function AppUploadFile({setUploadFile}) {
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
      .post("http://localhost:5000/upload", formData, {headers: {'Content-Type': 'multipart/form-data'}})
    
      .then((response) => {
        setFile(null);
        Promise.resolve(response)
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
    <div>
      <form>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button onClick={async (e) => {
          // todo - No setear set upload file como false hasta que la promesa esté resuelta
          // todo - Colocar una alerta para cuando los archivos se hayan subido éxitosamente
          await handleUpload(e)
          await setUploadFile(false)  
        }}>Subir</button>
      </form>
    </div>
  );
}

export default AppUploadFile;
