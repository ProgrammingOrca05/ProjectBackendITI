const doctorModel = require("../Models/Doctor");
const Patient=require("../Models/Patient")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Function to generate JWT token
function generateToken(doctor) {
    return jwt.sign({ id: doctor._id, email: doctor.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}


//sign up doctor تسجيل دكتور
const createDoctor = async (req, res) => {
    try {
        const newDoctor = new doctorModel(req.body); //إنشاء object جديد من الموديل
        await newDoctor.save(); //حفظ ال object في قاعدة البيانات
        res.status(201).json({
            message: "Doctor created successfully",
            status: "success",
            data: {
                name: newDoctor.name,
                email: newDoctor.email,
                specialization: newDoctor.specialization,
            }
        });//تم انشاء الدكتور بنجاح
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                message: "Duplicate field (possibly email) value entered",
                status: "fail",
                data: null
            });//قيمة حقل مكررة تم إدخالها
            return;
        }

        if (err.name === "ValidationError") {
            res.status(400).json({
                message: err.message,
                status: "fail",
                data: null
            });//خطأ في التحقق من الصحة 
            return;
        }

        res.status(500).json({
            message: err.message,
            status: "fail",
            data: null
        });//خطأ في الخادم الداخلي
        return;
    }
}

//login doctor تسجيل دخول دكتور 

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body; //جلب البريد الإلكتروني وكلمة المرور من جسم الطلب
        const doctor = await doctorModel.findOne({ email });//البحث عن الدكتور في قاعدة البيانات باستخدام البريد الإلكتروني
        if (!doctor) {
            return res.status(404).json({
                message: "invalid email or password!",
                status: "fail",
                data: null
            });//الدكتور غير موجود
        }

        const isMatch = await doctor.comparePassword(password);//مقارنة كلمة المرور المدخلة مع كلمة المرور المشفرة في قاعدة البيانات
        if (!isMatch) {
            res.status(404).json({
                message: "invalid email or password!",
                status: "fail",
                data: null
            });//كلمة المرور غير صحيحة
            return;
        }

        const token = generateToken(doctor);//توليد توكن JWT 
        res.status(200).json({
            message: "Doctor logged in successfully",
            status: "success",
            token,
            data: {
                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                specialization: doctor.specialization,
            }
        });//تم تسجيل دخول الدكتور بنجاح  
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "fail",
            data: null
        });//خطأ في الخادم الداخلي  
    }
}


//sign up patient تسجيل مريض    

const createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json({
            message: "Patient created successfully",
            status: "success",
            data: {
                name: patient.name,
                email: patient.email,
                age: patient.age,
                gender: patient.gender
            }
        });//تم انشاء المريض بنجاح
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                message: "Duplicate field (possibly email) value entered",
                status: "fail",
                data: null
            });//قيمة حقل مكررة تم إدخالها
            return;
        }

        if (err.name === "ValidationError") {
            res.status(400).json({
                message: err.message,
                status: "fail",
                data: null
            });//خطأ في التحقق من الصحة 
            return;
        }

        res.status(500).json({
            message: err.message,
            status: "fail",
            data: null
        });//خطأ في الخادم الداخلي
        return;
    }
};

//login patient تسجيل دخول مريض
const loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body; //جلب البريد الإلكتروني وكلمة المرور من جسم الطلب
        const patient = await Patient.findOne({ email });//البحث عن المريض في قاعدة البيانات باستخدام البريد الإلكتروني
        if (!patient) {
            return res.status(404).json({
                message: "invalid email or password!",
                status: "fail",
                data: null
            });//المريض غير موجود
        }
        const isMatch = await patient.comparePassword(password);//مقارنة كلمة المرور المدخلة مع كلمة المرور المشفرة في قاعدة البيانات
        if (!isMatch) {
            res.status(404).json({
                message: "invalid email or password!",
                status: "fail",
                data: null
            });//كلمة المرور غير صحيحة
            return;
        }

        const token = generateToken(patient);//توليد توكن JWT
        res.status(200).json({
            message: "Patient logged in successfully",
            status: "success",
            token,
            data: {
                id: patient._id,
                name: patient.name,
                email: patient.email,
                age: patient.age,
            gender: patient.gender
            }
        });//تم تسجيل دخول المريض بنجاح  
    } catch (err) {
        res.status(500).json({
            message: err.message,
            status: "fail",
            data: null
        });//خطأ في الخادم الداخلي
    }
}



module.exports = { createDoctor, loginDoctor ,createPatient,loginPatient};//استيراد الفانكشنز في ملفات أخرى 
