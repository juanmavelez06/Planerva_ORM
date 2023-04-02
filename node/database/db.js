import { Sequelize } from "sequelize"

//Nombre de la base de datos, el usuario y la password
const db = new Sequelize('planerva' ,'root','Nativedatabase19', {
    host:'localhost',
    dialect: 'mysql'
})

export default db;