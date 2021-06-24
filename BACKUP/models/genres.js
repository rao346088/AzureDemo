const Jio = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));


function validate(Genre){
    const schema = Jio.object({
        name: Jio.string().min(3).required()
})
   return schema.validate(Genre)
}

exports.Genre    = Genre ;
exports.validate = validate ;

