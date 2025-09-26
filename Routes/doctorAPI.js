const exp=require('express');
const router=exp.Router();
const doctorController=require('../controllers/docterController');

//Create Doctor إنشاء دكتور
router.post('/api/createDoctor',doctorController.createDoctor);


//get doctor details الحصول على تفاصيل الدكتور
router.get('/api/findDoctor/:id',doctorController.getDoctorDetails);

//get all doctors الحصول على جميع الأطباء
router.get("/api/alldoctors",doctorController.getAllDoctors);

module.exports=router;//router export