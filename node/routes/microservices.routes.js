import express from "express"
const router = express.Router();
import { Sequelize } from "sequelize";

// !Función que corre los datos del microservicio y los guarda en la base de datos.
router.post("/recibirDatos", async (req, res) => {
    // todo Crear controladores para esta ruta
    try {
      const data = req.body
    
      // ! Bucle en funcionamiento para los datos recibidos del microservicio* 
      data.forEach((e) => {
        console.log(e.Nombre)
        console.log(e.Apellido)
        console.log(e.Edad)
  
        // todo Guardar datos en variables y subirlos a través del ORM
      });  
    } catch (error) {
      console.log(error) 
    }
  });

export default router