const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
const db = 'mongodb://localhost/Playground'

//const db = "mongodb+srv://Raghu:Raghu123@cluster0.htnmx.mongodb.net/Eventsdb?retryWrites=true&w=majority";

mongoose.Promise = Promise;

mongoose.connect(db, {useUnifiedTopology: true,useNewUrlParser: true})
 .then(()=>console.log('connected to  monogodb'))
 .catch(()=>console.error("could not connect tot monngodb",error))

 const coursechema = new mongoose.Schema({
     name :
     {type: String ,
      required:true,
      minlength:3,
      maxlength:255,
        lowercase: true},
     author: String,
     tags:{
         type: Array ,
         valdiate:{
         isAsync: true,
         validator:function(v,callback){  
             setTimeout(() => {
                 const result = v && v.length> 0  
                 callback(result)  
             }, 2000);
         } ,
         message: 'A Course should have ateleaset one flag'
        } 
    },
     date:{ type:Date, default: Date.now()},
     isPublished:Boolean,
     price :{
         type: Number,
         required: function(){return this.isPublished},
         get:v=>Math.round(v),
         set:v=>Math.round(v)
     },
     category:{
         type:String,
         required:true,
         enum:['Web','Mobile','Network']
     }

 });

 const Course = mongoose.model('Course',coursechema)
 async function CreateCourse(){
    const course = new Course({
       name : 'Angularxxx js course',
        author: 'Mosh',
     //   tags:[ 'Angular','Front End'],
     //   tags:[],
        isPublished:true,
        category:'xxx',
        price:15
     })
     try{
        const result = await course.save()
        console.log(result)
     }
     catch(ex){
        for (field in ex.errors) 
        {console.log(ex.errors[field].message)}
     }
     
     
 
 }
  CreateCourse()

// async function getCourses(){
//     //  const pageNumber = 2
//     //  const pageSize   =10
//        const course = await Course
//          .find({author:'Mosh',isPublished:true})
//     //   .find({name :{$in : ['Angular js course','Node js course']}})
//     //   .find()
//     //   .or([{author :'Mosh'},{isPublished:true}])
//     //   .find({author:/^Mosh/})
//     //   .find({author:/Mosh$/i})
//     //  .find()
//     //  .skip((pageNumber - 1 ) * pageSize)
//     //  .limit(pageSize)
//      //  .sort({name:1})
//     //   .select({name:1,author:1});
//       .count()
//
//        console.log(course)
//    }
//
//  getCourses() ;

// async function updateCourse(id){
 //    const course = await Course.findById(id)
 //    if (!course) return;
//
 //    course.isPublished = false
 //    course.author = 'another author'
//     if (!course) return;
//     course.isPublished = false
//     course.author = 'another author'
//      const result = await course.save()

 //   const result = await Course.update({_id:id},{
 //       $set :{
 //           author: 'Mosh',
 //           isPublished: true
 //       }
 //     });
 //     console.log(result)
 //   }
 //
 //   updateCourse('60abc62e0e1a8886dd62f097')
