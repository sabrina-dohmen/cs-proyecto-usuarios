import { Sequelize } from 'sequelize';

const db = new Sequelize(
    'usuarios', // nombre de la base de datos
    'sdohmen', // usuario
    'mysql', // contraseña
    { // objeto de configuracion
        host: 'localhost', // ubicacion de la base de datos
        dialect: 'mssql', // sql server
        //port: 1433
        // logging: false // para ver ejecucion por consola
    }
);

export default db;