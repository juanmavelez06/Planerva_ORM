import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const URL = "http://localhost:8000/blogs/";

const CompCreatePersonal = () =>{
    const [title, settitle] = useState("")
    const [conten, setconten] = useState("")
    const navigate = useNavigate()

    const store = async (e) =>{
        e.preventDefault()
        await axios.post(URL, {Title:title, Conten:conten})
        navigate('/')
    }

    return(
        <div>
            <h1>Vista CREAR</h1>
            <form onSubmit={store}>
                <div>
                    <label> Titulo </label>
                    <input 
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        type="text"
                    ></input>
                    <label> Conten</label>
                      <input 
                        value={conten}
                        onChange={(e) => setconten(e.target.value)}
                        type="text"
                    ></input>
                    <button onSubmit={store}>Store</button>
                    <Link to={'/'}>Regresar</Link>
                </div>

            </form>
           
        </div>
    )
}
export default CompCreatePersonal;