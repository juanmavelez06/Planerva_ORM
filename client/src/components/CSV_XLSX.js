import { useState } from "react";

function FileUpload() {
    const [file, setfile] = useState("");

    const handleFileUpload = (e) => {
        setfile(e.target.files[0]);
        // Guardo el archivo en el estado proporcionado por el Hooks "useState"
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(); 
        // FormData me permite el envio de archivos en una solicitud HTTP que luego envio con fetch o axios 
        formData.append('file', file);
        fetch('/cargarCsv', {
            method: 'POST',
            body:formData
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileUpload} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
            <br>
            </br>
            <button type="submit">Subir Archivo😃</button>
        </form>
    )

}

export default FileUpload;