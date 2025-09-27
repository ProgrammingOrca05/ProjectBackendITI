const exp=require('express');
const router=exp.Router();
const doctorController=require('../controllers/docterController');

//Create Doctor إنشاء دكتور
router.post('/api/doctors',doctorController.createDoctor);


//get doctor details الحصول على تفاصيل الدكتور
router.get('/api/doctors/:id',doctorController.getDoctorDetails);

//get all doctors الحصول على جميع الأطباء
router.get("/api/doctors",doctorController.getAllDoctors);
//تحديث تفاصيل الدكتور 
router.patch("/api/doctors/:id",doctorController.updateDoctorDetails);




module.exports=router;//router export