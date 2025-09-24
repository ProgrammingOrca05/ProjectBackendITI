const mongo=require("mongoose");

const doctorSchema=new mongo.Schema({
    name:{type:String,required:true},
    ssn:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true,lowercase:true,match:[/^\S+@\S+\.\S+$/,'invalid email!']},
    password:{type:String,required:true,minlength:8},
    specialization:{type:String,required:true},
    about:{type:String,required:true},
    workHrs:{type:String,required:true}
},{timestamps:true});



module.exports=[doctorSchema];