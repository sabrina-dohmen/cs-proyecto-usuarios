"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('usuarios', // nombre de la base de datos
'sdohmen', // usuario
'mysql', // contraseña
{
    host: 'localhost',
    dialect: 'mssql', // sql server
    //port: 1433
    // logging: false // para ver ejecucion por consola
});
exports.default = db;
//# sourceMappingURL=connection.js.map