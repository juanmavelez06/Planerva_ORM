import { Sequelize } from "sequelize"

 //Nombre de la base de datos, el usuario y la password
const db = new Sequelize('planervamoduls' ,'root','', {
    host:'localhost',
    dialect: 'mysql'
})

export default db;