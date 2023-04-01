import db from "../database/db";

import BlogModel from "./BlogModel";
import db from "../database/db";

import ModelPrueba from "./ModelPrueba";
import dbprueba from "../database/dbprueba";

const express = require("express");
const app = express();

//Solicitud Http GET a la direccion que me devuelve el JSON
fetch("")
  .then((response) => response.json())
  .then((data) => {
    // Recorro el JSON y extraigo los datos necesarios
    data.forEach((item) => {
      const name = item.name;
      const email = item.email;
      const phone = item.phone;

      //   const auxiliar = item.AUXILIAR;
      //   const abril = item.Abril;
      //   const agosto = item.Agosto;
      //   const c = item.C;
      //   const concepto = item.CONCEPTO;
      //   const cu = item.CU;
      //   const cuen = item.CUEN;
      //   const cuenta = item.CUENTA;
      //   // const cuenta.1 = item.CUENTA.1;
      //   const descripcion = item.DESCRIPCION;
      //   const diciembre = item.Diciembre;
      //   const enero = item.Enero;
      //   const febrero = item.Febrero;
      //   // const gastoref = Gasto Ref;
      //   const julio = item.Julio;
      //   const junio = item.Junio;
      //   const marzo = item.Marzo;
      //   const mayo = item.Mayo;
      //   const noviembre = item.Noviembre;
      //   const octubre = item.Octubre;
      //   const septiembre = item.Septiembre;
      //   // const tipodecosto= item.TIPO DE COSTO;
      //   const total = item.Total;

      //Instancia del modelo y guardado de los datos en base de datos
      Datacsv.create({

        name: name,
        email: email,
        phone: phone
        
        // Area: ;
        // Position: ;
        // Classing: ;
        // Account: ;
        // Refsalary: ;
        // Incsalary: ;
        // Auxtransport: ;
        // Workersneeded: ;
        
      })
        .then(() => console.log("Usuario guardado correctamente"))
        .catch((error) => console.error("Error al guardar el usuario:", error));
    });
  })
  .catch((error) => console.error("Error al obtener el JSON:", error));

const Datacsv = ModelPrueba;
const sequelize = dbprueba;

sequelize
  .authenticate()

  .then(() => console.log("Conexión establecida correctamente."))
  .catch((error) =>
    console.error("Error al conectar con la base de datos:", error)
  );

Datacsv.sync()
  .then(() => console.log("Tabla sincronizada correctamente."))
  .catch((error) => console.error("Error al sincronizar la tabla:", error));

app.listen(8000, () =>
  console.log("La aplicación está en ejecución en el puerto 8000.")
);
