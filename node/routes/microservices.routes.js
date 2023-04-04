import express from "express"
const router = express.Router();
import { Sequelize } from "sequelize";
import db from "../database/db.js";
import BudgetModel from "../models/BudgetModel.js";

// !Función que corre los datos del microservicio y los guarda en la base de datos.

const dbconection = db;
const Budget = BudgetModel;

router.post("/recibirDatos", async (req, res) => {
    // todo Crear controladores para esta ruta
    try {
      const data = req.body
    
      // ! Bucle en funcionamiento para los datos recibidos del microservicio* 
      data.forEach((e) => {

        // const nombre = e.Nombre
        // const apellido = e.Apellido
        // const edad = e.Edad

        // console.log(e.Nombre)
        // console.log(e.Apellido)
        // console.log(e.Edad)

        const area = e.area
        const position = e.position
        const classing = e.classing
        const account = e.account
        const refsalary = e.refsalary
        const incsalary = e.incsalary
        const auxtransport = e.auxtransport
        const workersneeded = e.workersneeded

        console.log(e.area)
        console.log(e.position)
        console.log(e.classing)
        console.log(e.account)
        console.log(e.refsalary)
        console.log(e.incsalary)
        console.log(e.auxtransport)
        console.log(e.workersneeded)

        // ! Crea una instancia del modelo Budget y guarda los datos en la base de datos mysql
        // ! Dejo documentado las secciones de codigo para pruebas y habilito la conexion real con la base de datos budgetpersonal

        // Budget.create({
        //   Nombre:nombre,
        //   Apellido:apellido,
        //   Edad:edad
        // })

        // Budget.create({
        //   area:area,
        //   position:position,
        //   classing:classing,
        //   account:account,
        //   refsalary:refsalary,
        //   incsalary:incsalary,
        //   auxtransport:auxtransport,
        //   workersneeded:workersneeded,
        // })

        dbconection.authenticate()

        
        // todo Guardar datos en variables y subirlos a través del ORM
      });  
      res.send('Datos guardados correctamente.')
    } catch (error) {
      console.log(error) 
      res.status(500).send('Ucurrio un error al guardar los datos.')
    }

  });

export default router