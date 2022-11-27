const Passenger = require('./passenger');
const Driver = require('./driver');
const Cab = require('./cab');
const Booking = require('./booking');
const Admin = require('./admin');


Driver.hasMany(Cab, {foreignKey:'driver_id'});
Cab.belongsTo(Driver, {
    foreignKey:'driver_id'
});


Cab.hasMany(Booking, {foreignKey:'cab_no'});
Booking.belongsTo(Cab,{
    foreignKey: 'cab_no'
});
 
Cab.hasMany(Booking, {foreignKey:'cost'});
Booking.belongsTo(Cab,{
    foreignKey: 'cost'
});

Passenger.hasMany(Booking,{foreignKey: 'passenger_id'});
Booking.belongsTo(Passenger, {
    foreignKey: 'passenger_id'
});

Driver.hasMany(Booking,{foreignKey : "driver_id"});
Booking.belongsTo(Driver, {
    foreignKey: "driver_id"
});



Passenger.sync({alter: true});
Driver.sync({alter: true});
Cab.sync({alter: true});
Booking.sync({alter:true});
Admin.sync({alter: true});