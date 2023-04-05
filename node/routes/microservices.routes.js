import express from "express";
const router = express.Router();
import { Sequelize } from "sequelize";
import db from "../database/db.js";
import BudgetModel from "../models/BudgetModel.js";

// !Función que corre los datos del microservicio y los guarda en la base de datos.

const dbconection = db;
const Budget = BudgetModel;

router.get("/prueba", async(req, res) => {
  const Prueba = {
    area: "a",
    position: "a",
    classing: "a",
    account: 0,
    refsalary: 0,
    incsalary: 0,
    auxtransport: 0,
    workersneeded: {
      January: 2,
      February: 1,
      March: 1,
      April: 1,
      May: 1,
      June: 10,
      July: 1,
      August: 1,
      September: 1,
      October: 1,
      November: 1,
      December: 1,
    },
  };
  
  let result = {...Prueba.workersneeded}
  const Pruebajson= JSON.stringify(result, String , 2);
  // console.log(Pruebajson);
  console.log(Pruebajson)
})


router.post("/recibirDatos", async (req, res) => {
  // todo Crear controladores para esta ruta
  
  try {
    const data = req.body;
    // ! Bucle en funcionamiento para los datos recibidos del microservicio*
    data.forEach((e) => {
      const area = e.area;
      const position = e.position;
      const classing = e.classing;
      const account = e.account;
      const refsalary = e.refsalary;
      const incsalary = e.incsalary;
      const auxtransport = e.auxtransport;
      const workersneeded = e.workersneeded;

      // console.log(e.area)
      // console.log(e.position)
      // console.log(e.classing)
      // console.log(e.account)
      // console.log(e.refsalary)
      // console.log(e.incsalary)
      // console.log(e.auxtransport)
      // console.log(e.workersneeded)

      // ! Crea una instancia del modelo Budget y guarda los datos en la base de datos mysql

      Budget.create({
        area: area,
        position: position,
        classing: classing,
        account: account,
        refsalary: refsalary,
        incsalary: incsalary,
        auxtransport: auxtransport,
        workersneeded: workersneeded,
      });
    });

    res.send("Datos guardados correctamente.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Ucurrio un error al guardar los datos.");
  }
});

try {
  await dbconection.authenticate();
  console.log("Conexion exitosa con la base de datos");
} catch (error) {
  console.log("Error al conectarse con la base de Datos :", error);
}

export default router;
