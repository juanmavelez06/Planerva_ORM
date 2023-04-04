import BudgetModel from '../models/BudgetModel.js'

//Metodos para el Crud

//Mostrar todos los registros
export const getAllBlogs = async (req, res) => {
  try {
    const budgets = await BudgetModel.findAll(); //findAll me trae todo
    res.json(budgets); //Respuesta en Json y como devolucion recibiremos los datos
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar un registro
export const getBlog = async (req, res) => {
  try {
    const budget = await BudgetModel.findAll({
      where: { id: req.params.id },
    });
    res.json(budget[0]); 
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un Registro
export const createBlog = async (req, res) => {
  try {
    await BudgetModel.create(req.body); //Capturamos todo el cuerpo de datos.
    res.json({
      message: "¡Registro creado correctamente!", //Formato clave - valor
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Actualizar un registro
export const updateBlog = async (req, res) => {
  try {
    await BudgetModel.update(req.body, {
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
export const deleteBlog = async (req, res) => {
  try {
    await BudgetModel.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "¡Registro eliminado con exito!",
    });
  } catch (error) {}
};
