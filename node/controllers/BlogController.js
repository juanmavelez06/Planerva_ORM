import BlogModel from "../models/BlogModel.js";

//Metodos para el Crud

//Mostrar todos los registros
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.findAll(); //findAll me trae todo
    res.json(blogs); //Respuesta en Jason y como devolucion recibiremos los blogs
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Mostrar un registro
export const getBlog = async (req, res) => {
  try {
    const blog = await BlogModel.findAll({
      where: { id: req.params.id },
    });
    res.json(blog[0]); 
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Crear un Registro
export const createBlog = async (req, res) => {
  try {
    await BlogModel.create(req.body); //Capturamos todo el cuerpo de datos.
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
    await BlogModel.update(req.body, {
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
    await BlogModel.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "¡Registro eliminado con exito!",
    });
  } catch (error) {}
};
