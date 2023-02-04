const Place = require('./models/Place');
const Result = require('./models/Result');
const User = require('./models/User');
const Visita = require('./models/Visita');


//Uno a uno
User.hasOne(Place);

Place.belongsTo(User);


User.hasOne(Visita);

Visita.belongsTo(User);

//Uno a muchos

Place.hasMany(Result);

Result.belongsTo(Place);


User.hasMany(Result);
Result.belongsTo(User);