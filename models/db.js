const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('cabsystem', 'root', 'Megha@2001', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports.sequelize = sequelize;