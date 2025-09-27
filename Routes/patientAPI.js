const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authenticate = require("../middleware/authorMiddlware");
const signUpLoginController=require('../controllers/signUpLogin');


//sign up patient تسجيل مريض    
router.post('/api/patient/signup', signUpLoginController.createPatient);


//login patient تسجيل دخول مريض
router.post('/api/patient/login',signUpLoginController.loginPatient);


//control pannel/profile for patient لوحة تحكم المريض   
router.get('/api/patient/me', authenticate, patientController.controlPannelPatient);

//get all patients الحصول على جميع المرضى
// router.get('/api/patient', patientController.getPatients);

//get a patient by ID الحصول على مريض بواسطة المعرف
// router.get('/:id', patientController.getPatientById);


//update a patient تحديث مريض
router.patch('/api/patient/me',authenticate, patientController.updatePatient);


//delete a patient حذف مريض 
router.delete('/api/patient/me',authenticate, patientController.deletePatient);

module.exports = router;
