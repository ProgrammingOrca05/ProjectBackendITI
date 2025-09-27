const exp=require('express');
const router=exp.Router();
const doctorController=require('../controllers/docterController');
const signUpLoginController=require('../controllers/signUpLogin');
const authenticate=require("../middleware/authorMiddlware");

//sign up doctor تسجيل دكتور
router.post('/api/doctors/signup',signUpLoginController.createDoctor);

//تسجيل دخول دكتور 
router.post("/api/doctors/login",signUpLoginController.loginDoctor);

//control pannel/profile for doctor لوحة تحكم الدكتور
router.get("/api/doctors/me",authenticate,doctorController.controlPannel);

//get doctor details الحصول على تفاصيل الدكتور
router.get('/api/doctors/:id',doctorController.getDoctorDetails);

//get all doctors الحصول على جميع الأطباء
router.get("/api/doctors",doctorController.getAllDoctors);

//تحديث تفاصيل الدكتور 
router.patch("/api/doctors/me",authenticate,doctorController.updateDoctorDetails);

//حذف حساب الدكتور
router.delete("/api/doctors/me",authenticate,doctorController.deleteDoctor);







module.exports=router;//router export