require('winston-mongodb');
const mongoose = require('mongoose')
const db = 'mongodb://localhost/vidly'
const winston = require('winston');


module.exports= function(app){
mongoose.Promise = global.Promise;
mongoose.connect(db, {useUnifiedTopology: true ,useNewUrlParser: true})
    .then(()=>winston.info('connected to  monogodb'))
    



}