import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const URL = "http://localhost:8000/blogs/";

const CompCreatePersonal = () => {
  const [area, setarea] = useState("");
  const [position, setposition] = useState("");
  const [classing, setclassing] = useState("");
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault();
    await axios.post(URL, {
      Area: area,
      Position: position,
      Classing: classing,
    });
    navigate("/");
  };

  return (
    <div>
      <h1>Ingreso de Datos </h1>
      <form onSubmit={store}>
        <div>
          <label> Area </label>
          <input
            value={area}
            onChange={(e) => setarea(e.target.value)}
            type="text"
          ></input>
          <label> Position </label>
          <input
            value={position}
            onChange={(e) => setposition(e.target.value)}
            type="text"
          ></input>
          <label> Classing </label>
          <input
            value={classing}
            onChange={(e) => setclassing(e.target.value)}
            type="text"
          ></input>
          <button onSubmit={store}>Guardar</button>
          <Link to={"/"}>Regresar</Link>
        </div>
      </form>
    </div>
  );
};
export default CompCreatePersonal;
