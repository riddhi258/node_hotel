const express = require('express');
const { size } = require('lodash');
const app = express();
const db = require ('./db');
const Person =require ('./models/person');
const menuItem = require('./models/menuItem');
const passport = require ('./auth');


const bodyParser=require ('body-parser');
app.use(bodyParser.json())//req body



app.use(passport.initialize());
const LocalAuthMiddleWare= passport.authenticate('local',{session:false})

app.get('/', LocalAuthMiddleWare, function(req,res)  {
  res.send('wlecom to our Hotel ')
})
/*app.get('/chai', function (req, res) {
    res.send('sure sir i whould love to serve chai')
  })
  app.get('/idli', function (req, res) {
    var custormized_idli={
        name:"rava idli",
        size:"10 cm diameter",
        is_sambhar:true,
        is_cutny : false

    }
    res.send(custormized_idli)
  })*/



// import the router files
const personRoute= require ('./routes/personRoute');
// use the router files
app.use('/person',personRoute);

const menuItemRoutes= require ('./routes/menuItemRoutes');
// use the router files
app.use('/menuItem',menuItemRoutes);


app.listen(3000,()=>{
    console.log("server is listing on port 3000");
})