const winston = require('winston');
require('express-async-errors')
require('winston-mongodb');
module.exports= function(app){
    //process.on('uncaughtException',ex=>{
//  console.log("we have an uncaught exception")
//  winston.error(ex.messsage,ex);
//  process.exit(1)
//})
//
//
//process.on('unhandledRejection',ex=>{
//  console.log("we have an unhandled reject")
//  winston.error(ex.messsage,ex);
//  process.exit(1)
//})

process.on('unhandledRejection',ex=>{
    throw ex
    
  }) 
  
  winston.handleExceptions
  (   new winston.transports.Console({ Colorize: true,prettyPrint:true }),
      new winston.transports.File({ filename: 'UncaughtExceptions.log' }));
  
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/vidly'}))
  
  //throw new Error('Something has failed during start up ');
  
  //const p = Promise.reject(new Error('Something has failed miserable'))
  //p.then(()=>console.log('done'))
  
}