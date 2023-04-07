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
    data.forEach((e) => {

      // const area = e.area;
      // const position = e.position;
      // const classing = e.classing;
      // const account = e.account;
      // const refsalary = e.refsalary;
      // const facPerformance = e.facPerformance;
      // const workersneeded = e.workersneeded;

      console.log(e.area)
      console.log(e.position)
      console.log(e.classing)
      console.log(e.account)
      console.log(e.refsalary)
      console.log(e.facPerformance)
      console.log(e.workersneeded)

      // ! Crea una instancia del modelo Budget y guarda los datos en la base de datos mysql

      // Budget.create({
      //   area: area,
      //   position: position,
      //   classing: classing,
      //   account: account,
      //   refsalary: refsalary,
      //   facPerformance: facPerformance,
      //   workersneeded: workersneeded,
      // });

    });

    res.send("Datos guardados correctamente.");
  } catch (error) {
    console.error( "Ocurrio un error al guardar los datos",error);
    res.status(500).send("Ocurrio un error al guardar los datos.");

    //! Registra el error en un archivo de regsitro llamado error.log permitiendo revisar el registro de errores ocurridos en proyecto - esta en fase de pruebas 

    fs.appendFileSync("error.log", `${new Date().toISOString()} - ${error.message}\n`);
  }
});

try {
  await dbconection.authenticate();
  console.log("Conexion exitosa con la base de datos");
} catch (error) {
  console.log("Error al conectarse con la base de Datos :", error);
}

export default router;
