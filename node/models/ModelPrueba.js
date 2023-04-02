//Importamos la conexion con base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";
import dbprueba from "../database/dbprueba.js";

//Necesita el nombre de la tabla y sus atributos
const ModelPrueba = dbprueba.define("archivos", {
  Nombre: Sequelize.STRING,
  Apellido: Sequelize.STRING,
  Edad: Sequelize.NUMBER,
});

export default ModelPrueba;
