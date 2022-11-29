'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize} = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


// ELIMINANDO TODO ESTO LAS RUTAS DESPUÉS ANDAN. HAY QUE PROBAR SI FUNCIONAN LAS CREACIONES DE MODELOS Y LAS MIGRACIONES
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });


//Agregamos los modelos a la DB
const User=require("./user")
//const Invitation=require("./invitation")
const Award=require("./award")
const Milestone=require("./milestone")


db.User=User(sequelize,Sequelize)
db.Award=Award(sequelize,Sequelize)
db.Milestone=Milestone(sequelize,Sequelize)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
