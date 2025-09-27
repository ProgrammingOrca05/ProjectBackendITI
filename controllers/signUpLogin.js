const doctorModel = require("../Models/Doctor");
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


//Control pannel for doctor لوحة تحكم الدكتور   




module.exports = { createDoctor, loginDoctor };//استيراد الفانكشنز في ملفات أخرى 
