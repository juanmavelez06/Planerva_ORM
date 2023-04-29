import BudgetModel from '../models/BudgetModel.js';
import ExcelJS from 'exceljs';

//Metodos para el Crud

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
        // { header: 'Enero', key: 'area' },
        // { header: 'Febrero', key: 'position' },
        // { header: 'Marzo', key: 'classing' },
        // { header: 'Abril', key: 'area' },
        // { header: 'Mayo', key: 'position' },
        // { header: 'Junio', key: 'classing' },
        // { header: 'Julio', key: 'area' },
        // { header: 'Agosto', key: 'position' },
        // { header: 'Septiembre', key: 'classing' },
        // { header: 'Octubre', key: 'area' },
        // { header: 'Noviembre', key: 'position' },
        // { header: 'Diciembre', key: 'classing' },
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

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

export const controllerfile = async (req, res) =>{
  console.log(req.file)
}
