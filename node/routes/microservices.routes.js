import express from "express";
import { Sequelize } from "sequelize";
import db from "../database/db.js";
import BudgetModel from "../models/BudgetModel.js";
import fs from 'fs';


// !Función que corre los datos del microservicio y los guarda en la base de datos.

const router = express.Router();
const dbconection = db;
const Budget = BudgetModel;

router.post("/recibirDatos", async (req, res) => {
  // * Crear Controladores para esta ruta
  try {
    // const data = req.body;
    const newData = [];
    const months = {
      "Enero" : "January",
      "Febrero" : "February",
      "Marzo" : "March",
      "Abril" : "April",
      "Mayo" : "May",
      "Junio" : "June",
      "Julio" : "July",
      "Agosto" : "August",
      "Septiembre" : "September",
      "Octubre" : "October",
      "Noviembre" : "November",
      "Diciembre" : "December",
    }
    for (const obj of req.body) {
      const workersneeded = {};
      for (const key in obj) {
        if (months.hasOwnProperty(key)) {
          workersneeded[months[key]] = obj[key];
        }
      }
      obj.workersneeded = workersneeded;
      newData.push(obj);
    }
    const jsonString = JSON.stringify(newData);    
    const jsonArray = JSON.parse(jsonString);

    jsonArray .forEach((e) => {

      const area = e.area;
      const position = e.position;
      const classing = e.classing;
      const account = e.account;
      const refsalary = e.refsalary;
      const facperformance = e.facperformance;
      const workersneeded = e.workersneeded;
      const workersneededStirng = JSON.stringify(workersneeded);

      // ! Crea una instancia del modelo Budget y guarda los datos en la base de datos mysql
      Budget.create({
        area: area,
        position: position,
        classing: classing,
        account: account,
        refsalary: refsalary,
        facperformance: facperformance,
        workersneeded: workersneededStirng,
      });

    });

    res.send("Datos guardados correctamente.");
  } catch (error) {
    console.error("Ocurrio un error al guardar los datos", error);
    res.status(500).send("Ocurrio un error al guardar los datos.");

    //! Registra el error en un archivo de regsitro llamado error.log permitiendo revisar el registro de errores ocurridos en proyecto - esta en fase de pruebas

    fs.appendFileSync(
      "error.log",
      `${new Date().toISOString()} - ${error.message}\n`
    );
  }
});

try {
  await dbconection.authenticate();
  console.log("La conexion se dio con exito");
} catch (error) {
  console.log("Error al conectarse con la base de Datos :", error);
}

export default router;
