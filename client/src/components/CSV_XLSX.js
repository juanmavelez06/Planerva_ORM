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
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(response.ok) {
            console.log("Archivo cargado con éxito");
            // Aquí podrías actualizar la UI de tu componente React si deseas
        } else {
            console.log("Error al cargar el archivo");
            // Aquí podrías manejar un mensaje de error o actualizar la UI de tu componente React si deseas
        }
    })
    .catch(error => console.error(error));
};

return(
    <form onSubmit={handleSubmit} action="/prueba" method="POST" enctype="multipart/form-data">
        <input type="file" onChange={handleFileUpload} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name='file' />
        <br>
        </br>
        <button type="submit" >Subir Archivo😃</button>
    </form>
)
}

export default FileUpload;









// import { useState } from "react";

// function FileUpload() {
//     const [file, setfile] = useState("");

//     const handleFileUpload = (e) => {
//         setfile(e.target.files[0]);
//         // Guardo el archivo en el estado proporcionado por el Hooks "useState"
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData(); 
//         // FormData me permite el envio de archivos en una solicitud HTTP que luego envio con fetch o axios 
//         formData.append('file', file);
//         fetch('/', {
//             method: 'POST',
//             body:formData
//         })
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error(error));
//     };

//     return(
//         <form onSubmit={handleSubmit}>
//             <input type="file" onChange={handleFileUpload} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name="file" />
//             <button type="submit" >Subir Archivo😃</button>
//         </form>
//     )

// }

// export default FileUpload;