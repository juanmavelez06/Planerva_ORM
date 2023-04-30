import CsvModel from "../models/CsvModel.js";
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

//Mostrar todos los registros
export const getAllcsv = async (req, res) => {
  try {
    const csv = await CsvModel.findAll(); //findAll me trae todo
    res.json(csv); //Respuesta en Json y como devolucion recibiremos los datos
  }catch (error) {
      logger.error(`Error al obtener los registros: ${error}`);
      res.json({ message: error.message });
    }
};

//Crear un Registro
export const createcsv = async (req, res) => {
  try {
    await CsvModel.create(req.body); //Capturamos todo el cuerpo de datos.
    res.json({
      message: "¡Registro creado correctamente!", //Formato clave - valor
    });
  } catch (error) {
    logger.error(`Error al crear el registro: ${error}`);
    res.json({ message: error.message });
  }
};

//Actualizar un registro
export const updatecsv = async (req, res) => {
  try {
    await CsvModel.update(req.body, {
      where: { id: req.params.id },
      //Al actualizar debemos especificar que rehistro actualizar por lo que usamos la clausula where
    });
    res.json({
      message: "¡Registro actualizado correctamente!",
    });
  } catch (error) {
    logger.error(`Error al actualizar el registro: ${error}`);
    res.json({ message: error.message });
  }
};

//Eliminar un registro
export const deletecsv = async (req, res) => {
  try {
    await CsvModel.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "¡Registro eliminado con exito!",
    });
  } catch (error) {
    logger.error(`Error al eliminar el registro: ${error}`);
    res.json({ message: error.message });
  }
};
