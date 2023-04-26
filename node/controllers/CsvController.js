import CsvModel from '../models/CsvModel.js'


//Mostrar todos los registros
export const getAllcsv = async (req, res) => {
  try {
    const csv = await CsvModel.findAll(); //findAll me trae todo
    res.json(csv); //Respuesta en Json y como devolucion recibiremos los datos
  } catch (error) {
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
  } catch (error) {}
};


