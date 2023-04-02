import  express from "express";
import cors from 'cors';
import db from './database/db.js';
import blogRoutes from './routes/routes.js';
import { json } from "sequelize";

const app = express()

app.use(cors())
app.use(express.json())
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

app.get('/', (req,res)=> {
    res.send('Hola Mundo!')
})


app.listen(3000, () => {
    console.log('Servidor en funcionamiento http://localhost:3000/')
  });