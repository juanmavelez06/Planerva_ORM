import { Sequelize } from "sequelize"

 //Nombre de la base de datos, el usuario y la password
const db = new Sequelize('planervamoduls' ,'root','', {
    host:'localhost',
    dialect: 'mysql'
})

export default db;


// const Sequelize = require('sequelize');
// const express = require('express');
// const app = express();

// // Paso 1: Hacer una solicitud HTTP GET a la dirección que devuelve el JSON
// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => response.json())
//   .then(data => {
//     // Paso 2: Recorrer el JSON y extraer los datos necesarios
//     data.forEach(item => {
//       // Paso 4: Crear una instancia del modelo y guardar los datos en la base de datos
//       Usuario.create({
//         name: item.name,
//         email: item.email,
//         phone: item.phone
//       })
//         .then(() => console.log('Usuario guardado correctamente'))
//         .catch(error => console.error('Error al guardar el usuario:', error));
//     });
//   })
//   .catch(error => console.error('Error al obtener el JSON:', error));

// // Paso 3: Crear una conexión a la base de datos MYSQL utilizando Sequelize y definir un modelo para la tabla
// const sequelize = new Sequelize('mysql://usuario:contraseña@host:puerto/base-de-datos');

// const Usuario = sequelize.define('usuario', {
//   name: Sequelize.STRING,
//   email: Sequelize.STRING,
//   phone: Sequelize.STRING
// });

// sequelize.authenticate()
//   .then(() => console.log('Conexión establecida correctamente.'))
//   .catch(error => console.error('Error al conectar con la base de datos:', error));

// Usuario.sync()
//   .then(() => console.log('Tabla sincronizada correctamente.'))
//   .catch(error => console.error('Error al sincronizar la tabla:', error));

// // Ejecutar la aplicación en el puerto 3000
// app.listen(3000, () => console.log('La aplicación está en ejecución en el puerto 3000.'));