const express = require('express');
const genres = require('../routes/genres')
const customers = require('../routes/customers')
const error = require('../middleware/error')


module.exports= function(app){
    app.use(express.json())
    app.use('/genres',genres)
    app.use('/customers',customers)
    app.use(error)
}




