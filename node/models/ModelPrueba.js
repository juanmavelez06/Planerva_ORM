//Importamos la conexion con base de datos
import dbprueba from "../database/dbprueba.js";
import { DataTypes } from "sequelize";

//Necesita el nombre de la tabla y sus atributos
const ModelPrueba = dbprueba.define("archivos", {
<<<<<<< HEAD
  Nombre: Sequelize.STRING,
  Apellido: Sequelize.STRING,
  Edad: Sequelize.NUMBER,
=======
  Nombre: {type:DataTypes.STRING},
  Apellido: {type:DataTypes.STRING},
  Edad: {type:DataTypes.NUMBER},
  numeroprueba : {type:DataTypes.NUMBER},
>>>>>>> 6d62259a38750597222dd5207af591f6f0b4fb7e
});

export default ModelPrueba;
