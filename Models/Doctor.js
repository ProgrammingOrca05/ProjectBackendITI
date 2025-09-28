const mongo=require("mongoose");
const bcrypt=require("bcryptjs");

const doctorSchema=new mongo.Schema({
    name:{type:String,required:true},
    ssn:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true,lowercase:true,match:[/^\S+@\S+\.\S+$/,'invalid email!']},
    password:{type:String,required:true,minlength:8},
    specialization:{type:String,required:true},
    about:{type:String,required:true},
    workHrs:{type:String,enum:['8am-12pm','12pm-4pm','4pm-8pm'],default:'12pm-4pm',required:true},
    examinationPrice:{type:Number,required:true,min:0},
},{timestamps:true});

doctorSchema.pre("save",async function(){
    const salt=await bcrypt.genSalt(12); //انشاء ال salt
    this.password=await bcrypt.hash(this.password,salt); //تشفير كلمة المرور مع ال salt
    return;
    
})

//comapre password مقارنة كلمة المرور
doctorSchema.methods.comparePassword=async function(password){
    const isMatch=await bcrypt.compare(password,this.password); //مقارنة كلمة المرور المدخلة مع كلمة المرور المشفرة في قاعدة البيانات
    return isMatch;
}

module.exports=mongo.model("Doctor",doctorSchema);