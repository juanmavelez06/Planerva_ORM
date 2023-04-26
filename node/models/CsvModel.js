import db from "../database/db.js";
import { DataTypes } from "sequelize";

const CsvModel =  db.define('storecsvs',{
    datacsv: {type:DataTypes.STRING}
}) 

export default CsvModel;