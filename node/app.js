import  express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import db from './database/db.js';
import blogRoutes from './routes/routes.js';
<<<<<<< HEAD
import { json } from "sequelize";
=======
import { Sequelize } from "sequelize"

>>>>>>> 6d62259a38750597222dd5207af591f6f0b4fb7e
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
<<<<<<< HEAD
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
=======
    const Datacsv = ModelPrueba;
    const sequelize = dbprueba;

    // let result = req.body;
    // res.json(result)
    console.log(req.body)
    data.forEach((item) => {
       
        const nombre = item.Nombre;
        const apellido = item.Apellido;
        const edad = item.Edad;
        const numeroprueba = item.numeroprueba;
      
        //Instancia del modelo y guardado de los datos en base de datos
        Datacsv.create({
          Nombre: nombre,
          Apellido: apellido,
          Edad: edad,
          numeroprueba: numeroprueba
        })
          .then(() => console.log("Usuario guardado correctamente"))
          .catch((error) => console.error("Error al guardar el usuario:", error));
        // console.log(item.data)
      });
   
      sequelize.authenticate()
>>>>>>> 6d62259a38750597222dd5207af591f6f0b4fb7e
      
        .then(() => console.log("Conexión establecida correctamente."))
        .catch((error) =>
          console.error("Error al conectar con la base de datos:", error)
        );
      
      Datacsv.sync()
        .then(() => console.log("Tabla sincronizada correctamente."))
        .catch((error) => console.error("Error al sincronizar la tabla:", error));

<<<<<<< HEAD
    res.send('Datos recibidos correctamente')
=======
       
    res.send('Datos recibidos correctamente')
   
>>>>>>> 6d62259a38750597222dd5207af591f6f0b4fb7e
})

app.get('/', (req,res)=> {
    res.send('Hola Mundo!')
})


app.listen(port, () => {
<<<<<<< HEAD
    console.log(`Servidor corriendo en el puerto ${port}`)
});
=======
    console.log(`Servidor corriendo en el puerto ${port}`)
});

// !!
// TODO: Reparar el guardado de datos - tipo texto 
>>>>>>> 6d62259a38750597222dd5207af591f6f0b4fb7e
