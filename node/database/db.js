import { Sequelize } from "sequelize"
import { DB_DATABASE,  DB_HOST, DB_PASSWORD, DB_USERNAME } from "../config.js";

//Database connection
const db = new Sequelize(DB_DATABASE , DB_USERNAME , DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false
})

export default db;