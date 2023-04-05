// 1-Los modelos es una Abstraccion que representa una tabla en la base de datos 
//2-Nombre en sigular y comienzan con Mayuscula

//Importamos la conexion con base de datos
import db from "../database/db.js";
import { DataTypes } from "sequelize";

//Necesita el nombre de la tabla y sus atributos 
//! Mapeo los tipos de atributos que usare en mi conexion con la base de Datos; En este caso budgetpersonal 

const BudgetModel =  db.define('budgetpersonal',{

    area: {type:DataTypes.STRING},
    position: {type:DataTypes.STRING},
    classing: {type:DataTypes.STRING},
    accounts: {type:DataTypes.NUMBER},
    refSalary:{type:DataTypes.NUMBER},
    incrementSalary:{type:DataTypes.NUMBER},
    auxTransport:{type:DataTypes.NUMBER},
    workersNeeded:{type:DataTypes.STRING},

    // Nombre:{type:DataTypes.STRING},
    // Apellido:{type:DataTypes.STRING},
    // Edad:{type:DataTypes.STRING},
}) 

export default BudgetModel;