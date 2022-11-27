const { Sequelize, DataTypes} = require('sequelize');
const db = require('./db');

const Driver = db.sequelize.define('Driver', {
    driver_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    driver_license_no: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    driver_name: {
        type: DataTypes.STRING(50),
        allowNull:false
    },
    driver_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    driver_password: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    driver_mobile: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    driver_address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    driver_dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    driver_gender: {
        type: DataTypes.STRING(10),
        allowNull:false
    }
});

module.exports = Driver;