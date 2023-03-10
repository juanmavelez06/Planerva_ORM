import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import { className, html } from "gridjs";
import axios from "axios";
import "gridjs/dist/theme/mermaid.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faTrash,
  faPenToSquare,
  faPlus,
  faFileExport,
  faFileImport,
} from "@fortawesome/free-solid-svg-icons";

const URL = "http://localhost:8000/blogs/";
//Declaro la constante donde corre mi servidor node

function MyTable() {
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(URL);
    //me recibe como respuesta el metodo get de mi url
    setblogs(res.data);
    //Devuelvo como respuesta la data recibida por el metodo get
  };

  const deleteBlog = async (id) => {
    await axios.delete(`${URL}${id}`);
    getBlogs();
    //Al eliminar el useEfect me renderiza el metodo getBlogs actualizado
    //Plantillas literales ``
  };
      
  const columns = [
    { id: "id", name: "ID" ,},
    { id: "Area", name: "Area" },
    { id: "Classing", name: "Classing" },
    { id: "Account", name: "Acount" },
    {
      id: "button",
      name: "aaa",
      formatter: (_, row) =>
        html(`<div class="dropdown dropdown-left">
      <label tabindex="0" class="btn m-1">Click</label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><button>Prueba</button></li>
        <li><button>Prueba2</button></li>
      </ul>
    </div>`),
    },
  ];
  
 
  return (
    <div className="Table">
      <Grid
        data={blogs} 
        columns={columns} 
        search={true} 
        pagination={{
          limit: 5,
        }}
      />
    </div>
  );
}

export default MyTable;
