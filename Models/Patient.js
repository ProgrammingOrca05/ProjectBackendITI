const mongoose = require('mongoose');
const bcrypt=require("bcryptjs");


const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ssn: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: { type: String, required: true, minlength: 6 },
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  },
  { timestamps: true }
);


//hash password before saving to database قبل حفظ كلمة المرور في قاعدة البيانات 
patientSchema.pre("save",async function(){
    const salt=await bcrypt.genSalt(12); //انشاء ال salt
    this.password=await bcrypt.hash(this.password,salt); //تشفير كلمة المرور مع ال salt
    return;
})

//comapre password مقارنة كلمة المرور
patientSchema.methods.comparePassword=async function(password){
    const isMatch=await bcrypt.compare(password,this.password); //مقارنة كلمة المرور المدخلة مع كلمة المرور المشفرة في قاعدة البيانات
    return isMatch;
}


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
