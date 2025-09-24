const mongo = require('mongoose');
const patientSchema = new mongo.Schema({
  name: { type: String, required: true },
  ssn: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  password: { type: String, required: true },
  age: Number,
  gender: { type: String, enum: ['Male', 'Female', 'Other'] }
}, { timestamps: true });


module.exports = [patientSchema];