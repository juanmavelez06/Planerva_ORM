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
    //importante el uso de estas comillas = ``
}

app.get('/', (req,res)=> {
    res.send('Hola Mundo!')
})

app.listen(8000), () =>{
    console.log('server UP running in http://localhost:8000/')
} //Escuche en el puerto 8000