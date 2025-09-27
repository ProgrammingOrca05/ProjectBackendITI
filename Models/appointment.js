const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
   time:{
    type:String,
    required:true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/
   },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  notes: {
    type: String,
  },
  phone:{ type:String,required:true }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
