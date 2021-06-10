  const express = require('express');
   
  
//const bodyParser = require('body-parser');
//const cors = require('cors');
// const config = require('config');
// const morgan = require('morgan');
 const Startupdebugger = require('debug')('app:startup');
// const router=express.Router()   ;
   const PORT = process.env.PORT || 5000;
   const app = express();

  require('./startup/logging')()
  require('./startup/routes')(app)
  require('./startup/db')()
  require('./startup/prod')(app)
  
  
//   const db = 'mongodb://localhost/Playground'

//app.use(bodyParser.json());
//app.use(cors())
//const MasterLookup = require('./routes/MasterLookup');
//const genres = require('./genres');
//console.log(`Application Name : ${config.get('name')}`)
//console.log(`Application Name : ${config.get('mail.host')}`)
//
//if (app.get('env') ==='development')
//{
//    app.use(morgan('tiny'))
//    Startupdebugger('Morgan enabled')
//}
//
    Startupdebugger('Morgan enabled')

//    app.use('/genres', genres);
    app.get('/',function(req,res){
         res.send(`Hello from server ${app.get('env')}`)
     });

//app.use('/MasterLookup', MasterLookup);
////app.get('/',function(req,res){
////    res.send(`Hello from server ${app.get('env')}`)
////});
////
//
//
//// app.post('/api', api);
// // app.post('/',function(req,res){
// //     res.send(`Hello from server ${app.get('env')}`)
// // });
// // 
// //   app.get('/', function(req, res) {
////	res.send(`Hello from server ${app.get('env')}`)
// // 
////})
//
//
    app.listen(PORT, function(){
      console.log(`Server running on localhost: ${PORT}  ${app.get('env')}`);
    });