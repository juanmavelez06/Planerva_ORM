import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
    faUser,
    faMoneyBill,
    faArrowUpRightDots
} from "@fortawesome/free-solid-svg-icons";

const URL = "http://localhost:8000/blogs/";
const Card = () => {
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(URL);
    setblogs(res.data);
  };

  return (
    <div className="cards">
      <div className="Card_body">
        <div className="card_icon">
          <FontAwesomeIcon icon={faUser} className="icon_card" />
        </div>
        <h4  className="personal" >Personal Necesitado<p>(Promedio)</p></h4>
       
        {blogs.map((blog) => (
          <span className="blog">{blog.id}</span>
        ))}
      </div>

      <div className="Card_body">
        <div className="card_icon">
          <FontAwesomeIcon icon={faMoneyBill} className="icon_card" />
        </div>
        <h4 className="contable" >Cuenta Contable<p>(Promedio)</p></h4>
        
        {blogs.map((blog) => (
          <span className="blog">{blog.id}</span>
        ))}
      </div>

      <div className="Card_body">
        <div className="card_icon">
          <FontAwesomeIcon icon={faArrowUpRightDots} className="icon_card" />
        </div>

        <h4 className="salario">Incremento Salarial<p>(Promedio)</p></h4>
        {blogs.map((blog) => (
          <span className="blog">{blog.id}%</span>
        ))}
      </div>
    </div>
  );
};

export default Card;
