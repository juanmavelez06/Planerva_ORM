//Importamos la conexion con base de datos
import dbprueba from "../database/dbprueba.js";
import { DataTypes } from "sequelize";

//Necesita el nombre de la tabla y sus atributos
const ModelPrueba = dbprueba.define("archivos", {
  Nombre: {type:DataTypes.STRING},
  Apellido: {type:DataTypes.STRING},
  Edad: {type:DataTypes.NUMBER},
  numeroprueba : {type:DataTypes.NUMBER},
});

export default ModelPrueba;
