import { Sequelize } from "sequelize"
import dbkeys from "./keys.js";

//Nombre de la base de datos, el usuario y la password
const db = new Sequelize(dbkeys.database , dbkeys.user , dbkeys.password, {
    host:'localhost',
    dialect: 'mysql',
    logging: false
})

export default db;