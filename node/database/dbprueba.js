import { Sequelize } from "sequelize"

 //Nombre de la base de datos, el usuario y la password
const dbprueba = new Sequelize('Pruebas' ,'root','', {
    host:'localhost',
    dialect: 'mysql'
})

export default dbprueba;
