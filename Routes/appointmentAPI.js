const exp=require('express');
const router=exp.Router();
const appointmentController=require('../controllers/appointmentController');
const authenticate=require("../middleware/authorMiddlware");


//book an appointment حجز موعد  
router.post('/api/appointment',authenticate,appointmentController.bookAppointment);

//get all appointments for a patient or doctor جلب جميع المواعيد لمريض او دكتور
router.get('/api/appointment',authenticate,appointmentController.getAllAppointments);

//get details of an appointment جلب تفاصيل موعد
router.get('/api/appointment/:id',authenticate,appointmentController.getAppointmentById);

//compelete an appointment انهاء موعد
router.patch('/api/appointment/:id/complete',authenticate,appointmentController.completeAppointment);


//cancel an appointment الغاء موعد
router.patch('/api/appointment/:id/cancel',authenticate,appointmentController.cancelAppointment);





module.exports=router;//router export