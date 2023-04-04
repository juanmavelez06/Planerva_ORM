// 1-Los modelos es una Abstraccion que representa una tabla en la base de datos 
//2-Nombre en sigular y comienzan con Mayuscula

//Importamos la conexion con base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";

//Necesita el nombre de la tabla y sus atributos 
//! Mapeo los tipos de atributos que usare en mi conexion con la base de Datos; En este caso budgetpersonal 

const BudgetModel =  db.define('archivos',{
    Area: {type:DataTypes.STRING},
    Position: {type:DataTypes.STRING},
    Classing: {type:DataTypes.STRING},
    Account: {type:DataTypes.NUMBER},
    Refsalary:{type:DataTypes.NUMBER},
    Incsalary:{type:DataTypes.NUMBER},
    Auxtransport:{type:DataTypes.NUMBER},
    Workersneeded:{type:DataTypes.STRING},

    // Nombre:{type:DataTypes.STRING},
    // Apellido:{type:DataTypes.STRING},
    // Edad:{type:DataTypes.STRING},
}) 

export default BudgetModel;