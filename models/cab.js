const {Sequelize, DataTypes} = require('sequelize');
const db = require('./db');
const Driver = require('./driver');

const Cab = db.sequelize.define('Cab', {
    cab_no: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    cab_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cab_description: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    total_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    driver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // cost: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
});

// Driver.hasMany(Cab,{as:'drivertable'});
// Cab.belongsTo(Driver, {
//     foreignKey: 'driver_id',
//     // as: 'driver'
// });

module.exports = Cab;