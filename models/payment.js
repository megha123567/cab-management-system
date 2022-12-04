const {Sequelize, DataType, DataTypes} = require('sequelize');
const db = require('./db');

const Payment = db.sequelize.define('Payment',{
    payment_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cab_from: {
        type: DataTypes.STRING(50),
        allowNull:false
    },
    cab_to: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Payment;