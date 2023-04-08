import express from "express";
import { Sequelize } from "sequelize";
import db from "../database/db.js";
import BudgetModel from "../models/BudgetModel.js";

// !Función que corre los datos del microservicio y los guarda en la base de datos.

const router = express.Router();
const dbconection = db;
const Budget = BudgetModel;
 
router.post("/recibirDatos", async (req, res) => {
  // todo Crear controladores para esta ruta
  
  try {
    const data = req.body;
    // ! Bucle en funcionamiento para los datos recibidos del microservicio*
    console.log(data)
    

    res.send("Datos guardados correctamente.");
  } catch (error) {
    console.error( "Ocurrio un error al guardar los datos",error);
    res.status(500).send("Ocurrio un error al guardar los datos.");

    //! Registra el error en un archivo de regsitro llamado error.log permitiendo revisar el registro de errores ocurridos en proyecto - esta en fase de pruebas 

    // fs.appendFileSync("error.log", `${new Date().toISOString()} - ${error.message}\n`);
  }
});

try {
  await dbconection.authenticate();
  console.log("Conexion exitosa con la base de datos");
} catch (error) {
  console.log("Error al conectarse con la base de Datos :", error);
}

export default router;
