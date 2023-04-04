import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./database/db.js";
import blogRoutes from "./routes/routes.js";
import microservice from "./routes/microservices.routes.js";

//Initialize App
const app = express();

//Seetings
const port = 3000;

app.use(cors());
app.use(express.json());

//! Limites de Datos para la carga de archivos desde Servidor
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

//Routes
app.use("/budgets", blogRoutes);
app.use(microservice); // !Rutas del microservicio

//Initialize Database
try {
  await db.authenticate();
  console.log("Conexion exitosa con la base de datos");
} catch (error) {
  console.log(`El error de conexion es: ${error}`);
}

//Listen Port
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
