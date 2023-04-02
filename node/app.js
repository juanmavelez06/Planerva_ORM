import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./database/db.js";
import blogRoutes from "./routes/routes.js";
import ModelPrueba from "./models/ModelPrueba.js";
import dbprueba from "./database/dbprueba.js";
import { Sequelize } from "sequelize";
const app = express();
const port = 3000;
// const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/blogs", blogRoutes);

try {
  await db.authenticate();
  console.log("Conexion exitosa con la base de datos");
} catch (error) {
  console.log(`El error de conexion es: ${error}`);
}

// Definir el punto final para recibir los datos
app.post("/getfile", (req, res) => {
  const datos = req.body.datos;
  console.log(datos);
  // hacer algo con los datos recibidos
  res.status(200).send("Datos recibidos correctamente");
});

app.post("/recibirDatos", async (req, res) => {
  try {
    const data = req.body
  
    // ! Bucle en funcionamiento para los datos recibidos del microservicio* 
    data.forEach((e) => {
      console.log(e.Nombre)
      console.log(e.Apellido)
      console.log(e.Edad)

      // todo Guardar datos en variables y subirlos a través del ORM
    });
    console.log(req.body[0].Nombre)
    
  } catch (error) {
    console.log(error) 
  }
});

app.get("/", (req, res) => {
  res.send("Hola Mundo!");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// !!
// TODO: Reparar el guardado de datos - tipo texto
