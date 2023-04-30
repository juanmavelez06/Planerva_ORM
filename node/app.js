import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./database/db.js";
import blogRoutes from "./routes/routes.js";
import microservice from "./routes/microservices.routes.js";
import { PORT } from "./config.js";
import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    file: { type: "file", filename: "logs/app.log" },
    error: {
      type: "file",
      filename: "logs/error.log",
      layout: {
        type: "pattern",
        pattern: "[%d] [%p] [%c] - %m %n %f:%l %x{user} %x{trace}",
      },
    },
  },
  categories: {
    default: { appenders: ["console", "file"], level: "info" },
    error: { appenders: ["error"], level: "error" },
  },
});

const logger = log4js.getLogger("error");

//Initialize App
const app = express();

//Seetings
app.use(cors());
app.use(express.json());

//! Limites de Datos para la carga de archivos desde Servidor
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({ limit: "50mb", enconding: "utf8", extended: true })
);

//Routes
app.use("/budget", blogRoutes);
app.use("/storecsv", blogRoutes);
app.use(microservice); // !Rutas del microservicio

//Initialize Database
try {
  await db.authenticate();
  console.log("Conexion exitosa con la base de datos");
} catch (error) {
  logger.error(`El error de conexion es: ${error}`);
  // console.log(`El error de conexion es: ${error}`);
}

//Listen Port
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
