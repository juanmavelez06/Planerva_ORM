import  express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import db from './database/db.js';
import blogRoutes from './routes/routes.js';
import { json } from "sequelize";
import ModelPrueba from "./models/ModelPrueba.js";
import dbprueba from "./database/dbprueba.js";

const app = express()


const port = 3000
// const bodyParser = require('body-parser');


app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use('/blogs', blogRoutes) 

try {
    await db.authenticate()
    console.log('Conexion exitosa con la base de datos')
} catch (error) {
    console.log(`El error de conexion es: ${error}`)
    
}



// Definir el punto final para recibir los datos
app.post('/obtenerArchivo', (req, res) => {
  const datos = req.body.datos;
  console.log(datos);
  // hacer algo con los datos recibidos
  res.status(200).send('Datos recibidos correctamente');
});

app.post('/recibirDatos', (req, res) => {
    console.log('Recibiendo datos...')
    // console.log(req.body)
    const data = req.body
    data.forEach((item) => {
        const nombre = item.Nombre;
        const apellido = item.Apellido;
        const edad = item.Edad;
      
        //Instancia del modelo y guardado de los datos en base de datos
        Datacsv.create({
          nombre: Nombre,
          apellido: Apellido,
          edad: Edad,
        })
          .then(() => console.log("Usuario guardado correctamente"))
          .catch((error) => console.error("Error al guardar el usuario:", error));
      });
      
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

    res.send('Datos recibidos correctamente')
})

app.get('/', (req,res)=> {
    res.send('Hola Mundo!')
})


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
});
