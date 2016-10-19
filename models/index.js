'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
   // console.log('here1111111')
    var model = sequelize['import'](path.join(__dirname, file));
   // console.log('here222222222')
    db[model.name] = model;
  });
    //console.log('here22222222233333333333')

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
    //console.log('here22222222233333333333here22222222233333333333here22222222233333333333here22222222233333333333here22222222233333333333')


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
