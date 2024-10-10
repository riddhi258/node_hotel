const mongoose = require ('mongoose');
//define mongodb url
const mongoURL = 'mongodb://localhost:27017/hotels';

//set up to connect mongodb
mongoose.connect(mongoURL)
// get default connection
const db=mongoose.connection;
// define event listner for database connection
db.on('connected',()=>{
    console.log('connected to mongoDB server');
});
db.on('err',(err)=>{
    console.log(' mongoDB connection error:',err);
});
db.on('disconnected',()=>{
    console.log(' mongoDB disconnected');
});

//export the database connection

module.exports=db;