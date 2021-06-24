const express = require('express');
const router=express.Router()   ;
const jwt = require('jsonwebtoken')
let MasterLK = require('../MasterLookup.json');

router.get('/',verifyToken, (req,res) => {
  res.send(MasterLK)
})
    
  router.get('/:id', (req,res) => {
//  const schema = {id:Jio.Number.required(), 
//      MLType :Jio.String.min(3).required(),
//      MLName: Jio.String.min(3).required()
//                       
//  }
//
//  const result =Joi.validate(req.body,schema)
//  console.log(result)
//
//        if (result.error){
//            res.status(400).send(result.error)
//        }
//    
   let MLD= MasterLK.find(c=>c.id===parseInt(req.params.id)) 
   if (!MLD)
       {res.status(404).send("The MLK with given id not found")}
   else
   {res.send(MLD)
   }
  })
  
  function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
    return res.status(401).send('Unauthorized request') 
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
    return res.status(401).send('Unauthorized request') 
    }
//    console.log('payload.subject' ,payload.subject)
//    console.log("route" ,req.route.methods.get)
//   if (req.route.path == '/MasterLookup' && payload.subject.role !== 'IBSEADM') {
//        return res.status(401).send('Unauthorized request') 
//   }
    res.body = payload.subject
//   res.email = payload.subject.email
    next()
  }
  
  router.post('/',verifyToken, (req,res) => {
        
    let Data1 = req.body
    MasterLookup.push(Data1)
    
fs.writeFile("./MasterLookup.json", stringify(MasterLookup), err => {
        // Checking for errors
    if (err) throw err; 
    else
    console.log("Done writing"); // Success

    res.send(Data1)
    });
  })
  
  
  router.put('/:id',verifyToken, (req,res) => {
    
    let Data4 = MasterLookup.find(c=> c.id ===parseInt(req.params.id));
    if (!Data4) res.status(404).send('object with given id not found' );
    
    MasterLookup=MasterLookup.filter(o=>o.id !==Data4.id)
    Data4=req.body
    MasterLookup.push(Data4)
    fs.writeFile("./MasterLookup.json", stringify(MasterLookup), err => {
        // Checking for errors
    if (err) throw err; 
    else
    console.log("Done writing"); // Success
    res.send(Data4)
    });
  })
              
   router.delete('/:id',verifyToken, (req,res) => {
     let Data6 = MasterLookup.find(c=> c.id ===parseInt(req.params.id));
     if (!Data6) res.status(404).send('object with given id not found' );
     
     MasterLookup=MasterLookup.filter(o=>o.id !==Data6.id)
     fs.writeFile("./MasterLookup.json", stringify(MasterLookup), err => {
         // Checking for errors
     if (err) throw err; 
     else
     console.log("Done writing"); // Success
     res.send(Data6)
     });
   })
      
module.exports = router