import BudgetModel from '../models/BudgetModel.js';
import ExcelJS from 'exceljs';
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

export const dowloadBudgets = async (req, res) => {
  try {
   
    const budgets = await BudgetModel.findAll();
    console.log(budgets)
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Presupuesto');
    worksheet.columns = [
        { header: 'Area', key: 'area' },
        { header: 'Posicion', key: 'position' },
        { header: 'Clasificación', key: 'classing' },
        { header: 'Account', key: 'account' },
        { header: 'RefSalarial', key:'refsalary'},
        { header: 'FacPrestacional', key: 'facperformance' },
        // { header: 'Enero', key: 'Enero' },
        // { header: 'Febrero', key: 'Febrero' },
        // { header: 'Marzo', key: 'Marzo' },
        // { header: 'Abril', key: 'Junio' },
        // { header: 'Mayo', key: 'Julio' },
        // { header: 'Junio', key: 'Agosto' },
        // { header: 'Julio', key: 'Septiembre' },
        // { header: 'Agosto', key: 'Octubre' },
        // { header: 'Septiembre', key: 'Noviembre' },
        // { header: 'Octubre', key: 'Diciembre' },

    ];
    
    budgets.forEach((budget) => {
      worksheet.addRow({
        area: budget.area,
        position: budget.position,
        classing: budget.classing,
        account: budget.account,
        refsalarial: budget.refsalary,
        facperformance: budget.facperformance
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    res.setHeader('Content-Disposition', 'attachment; filename=budgets.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    logger.error(`Error al recorrer los registros: ${error}`)
    res.json({ message: error.message });
    // res.status(500).json({ message: error.message });
  }

};

//Mostrar todos los registros
export const getAllBlogs = async (req, res) => {
  try {
    const budgets = await BudgetModel.findAll(); //findAll me trae todo
    res.json(budgets); //Respuesta en Json y como devolucion recibiremos los datos
  } catch (error) {
    logger.error(`Error al obtener los registros: ${error}`);
    res.json({ message: error.message });
  }
};

// //Mostrar un registro
// export const getBlog = async (req, res) => {
//   try {
//     const budget = await BudgetModel.findAll({
//       where: { id: req.params.id },
//     });
//     res.json(budget[0]); 
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

//Crear un Registro
export const createBlog = async (req, res) => {
  try {
    await BudgetModel.create(req.body); //Capturamos todo el cuerpo de datos.
    res.json({
      message: "¡Registro creado correctamente!", //Formato clave - valor
    });
  } catch (error) {
    logger.error(`Error al crear el registro: ${error}`);
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
    logger.error(`Error al actualizar el registro: ${error}`);
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
  } catch (error) {
    logger.error(`Error al eliminar el registro: ${error}`);
    res.json({ message: error.message });
  }
};

export const controllerfile = async (req, res) =>{
  console.log(req.file)
}
