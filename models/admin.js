const {Sequelize, DataTypes} = require('sequelize');
const db = require('./db');

const Admin = db.sequelize.define('Admin', {
    admin_id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    admin_name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    admin_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    admin_password: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
});

module.exports = Admin;