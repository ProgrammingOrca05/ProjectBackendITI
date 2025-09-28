const appointment = require("../Models/appointment");
const doctorModel = require("../Models/Doctor");
const patientModel = require("../Models/Patient");

//book appointment حجز موعد

const bookAppointment = async (req, res) => {
    try {
        const { doctorId, date,time, notes, phone } = req.body;//جلب بيانات الحجز من جسم الطلب  
        const patientId = req.user.id;//جلب id المريض من التوكن
        const doctor = await doctorModel.findById(doctorId).select('_id name');//البحث عن الدكتور في قاعدة البيانات باستخدام ال id
        const exists = await appointment.findOne({ doctor: doctorId, date: date,time:time });
        if (exists) {
            return res.status(400).json({
                message: `there is already have an appointment with doctor ${doctor.name} on this date`,
                status: "fail",
                data: null
            });//لديك موعد مع هذا الطبيب في هذا التاريخ
        }
        const newAppointment = new appointment({
            doctor:doctor._id,
            patient:patientId,  // get patient ID from JWT
            date,
            time,
            notes,
            phone
        })
        await newAppointment.save();
        return res.status(200).json({
            message:"Appointment booked successfully!",
            status:"success",
            data:newAppointment
        })    
    }
    catch(err){
        res.status(500).json({
            message: err.message,
            status: "fail",
            data: null
        });//خطأ في الخادم الداخلي  
    }
}

//getall appointments for patient/doctor جلب جميع المواعيد للمريض  

const getAllAppointments = async (req, res) => {
    try{
        const userId = req.user.id;//جلب id المريض او الطبيب من التوكن
        const appointments = await appointment.find({ $or: [ { patient: userId }, { doctor: userId } ] })
            .populate('doctor', 'name specialization email') // populate doctor details
            .populate('patient', 'name email '); // populate patient details
        if(appointments.length===0)
        {
            return res.status(404).json({
                message:"No appointments found",
                status:"fail",
                data:null
            });//لا يوجد مواعيد
        }
        return res.status(200).json({
            message:"Appointments found successfully",
            status:"success",
            data:appointments
        })//تم العثور على المواعيد بنجاح    
    }catch(err){
        res.status(500).json({
            message: err.message,
            status: "fail",
            data: null
        });//خطأ في الخادم الداخلي
    }
}

//get specific appointment جلب موعد محدد   

const getAppointmentById = async (req, res) => {
    try{
        const { id } = req.params;
        const wantedAppoinment=await appointment.findById(id)
        .populate('doctor', 'name specialization email examinationPrice') // populate doctor details
        .populate('patient', 'name email gender phone'); // populate patient details
        if(!wantedAppoinment)
        {
            return res.status(404).json({
                message:"No appointment found",
                status:"fail",
                data:null
            });//لا يوجد مواعيد
        }
        return res.status(200).json({
            message:"Appointment found successfully",
            status:"success",
            data:wantedAppoinment
        })//تم العثور على المواعيد بنجاح    
    }catch(err){
        res.status(500).json({
            message: err.message,
            status: "fail",
            data: null
        });//خطأ في الخادم الداخلي  

    }

}


//complete an appointment (doctor's job) انهاء موعد

const completeAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const app = await appointment.findById(id);

        if (!app) return res.status(404).json({ message: "Appointment not found" });
        if(app.status==="Completed"||app.status==="Cancelled") return res.status(400).json({ message: `This appointment is already ${app.status}` });

        // Only the doctor who owns this appointment can complete it
        //check if the doctor id in the appointment matches the id in the token
        if (app.doctor.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to complete this appointment" });
        }//أنت غير مخول لإنهاء هذا الموعد

        app.status = "Completed";//تغيير حالة الموعد إلى مكتمل
        await app.save();//حفظ التغييرات في قاعدة البيانات

        res.status(200).json({ message: "Appointment marked as completed", data: app });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }//خطأ في الخادم الداخلي
};


//cancel an appointment (patient's job) الغاء موعد

const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const app = await appointment.findById(id);

        if (!app) return res.status(404).json({ message: "Appointment not found" });
        if(app.status==="Completed"||app.status==="Cancelled") return res.status(400).json({ message: `This appointment is already ${app.status}` });


        // Patient can cancel their own appointments
        const isPatient = await patientModel.findById(req.user.id);
        if (isPatient && app.patient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You cannot cancel this appointment" });
        }

        // Doctor can cancel their own appointments
        const isDoctor = await doctorModel.findById(req.user.id);
        if (isDoctor && app.doctor.toString() !== req.user.id) {
            return res.status(403).json({ message: "You cannot cancel this appointment" });
        }

        app.status = "Cancelled";
        await app.save();

        res.status(200).json({ message: "Appointment canceled successfully", data: app });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports={bookAppointment,getAllAppointments,getAppointmentById,completeAppointment,cancelAppointment};//export function