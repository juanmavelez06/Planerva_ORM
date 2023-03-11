import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const URL = "http://localhost:8000/blogs/";
const EditPersonal = () => {
  const [area, setarea] = useState("");
  const [position, setposition] = useState("");
  const [classing, setclassing] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const Update = async (e) => {
    e.preventDefault();
    await axios.put(`${URL}${id}`, {
      Area: area,
      Position: position,
      Classing: classing,
    });
    navigate("/"); //Ruta Raiz
  };

  useEffect(() => {
    getPersonalByid();
  }, []);

  const getPersonalByid = async () => {
    const res = await axios.get(`${URL}${id}`);
    setarea(res.data.Area);
    setposition(res.data.Position);
    setclassing(res.data.Classing);
  };

  return (
    <div>
      <h1>Editar Registros</h1>
      <form onSubmit={Update}>
        <div>
          <label>Area</label>
          <input
            value={area}
            onChange={(e) => setarea(e.target.value)}
            type="text"
          ></input>
          <label>Position</label>
          <input
            value={position}
            onChange={(e) => setposition(e.target.value)}
            type="text"
          ></input>
          <label>Classing</label>
          <input
            value={classing}
            onChange={(e) => setclassing(e.target.value)}
            type="text"
          ></input>

          <button onSubmit={Update}>Confirmar</button>
          <Link to={"/"}>Regresar</Link>
        </div>
      </form>
    </div>
  );
};

export default EditPersonal;
