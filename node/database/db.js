import { Sequelize } from "sequelize"
import { DB_DATABASE,  DB_HOST, DB_PASSWORD, DB_USERNAME, DB_PORT } from "../config.js";

//Database connection
const db = new Sequelize(DB_DATABASE , DB_USERNAME , DB_PASSWORD, {
    dialect: 'mysql',
    logging: false,
    host: DB_HOST,
    port: DB_PORT
})

export default db;