const sequelize = require('./db');
const {DataTypes} = require('sequelize');
const db = require('./db');
const Cab = require('./cab');
const Passenger = require('./passenger');
const Driver = require('./driver');

const Booking = db.sequelize.define('Booking', {
    booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date_of_booking: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cab_from: {
        type: DataTypes.STRING(50),
        allowNull:false
    },
    cab_to: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    booking_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    cab_no: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    passenger_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    driver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Booking;