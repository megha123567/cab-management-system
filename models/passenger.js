const {Sequelize, DataTypes} = require('sequelize');
const db = require('./db');

const Passenger = db.sequelize.define('Passenger', {
    passenger_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fisrtName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type:DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type:DataTypes.STRING(10),
        allowNull: false
    },
    mobile: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

});

module.exports = Passenger;