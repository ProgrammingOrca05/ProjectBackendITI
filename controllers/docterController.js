const doctorModel=require("../Models/Doctor");

//Create Doctor إنشاء دكتور
const createDoctor=async(req,res)=>
{
    try{
    const newDoctor=new doctorModel(req.body); //إنشاء object جديد من الموديل
    await newDoctor.save(); //حفظ ال object في قاعدة البيانات
    res.status(201).json({
        message:"Doctor created successfully",
        status:"success",
        data:{
            id:newDoctor._id,
            name:newDoctor.name,
            email:newDoctor.email,
            specialization:newDoctor.specialization,
            about:newDoctor.about,
            workHrs:newDoctor.workHrs
        }
    });//تم انشاء الدكتور بنجاح
    }catch(err)
    {
        if(err.code===11000)
        {
            res.status(400).json({
                message:"Duplicate field value entered",
                status:"fail",
                data:null
            });//قيمة حقل مكررة تم إدخالها
        }

        if(err.name==="ValidationError")
        {
            res.status(400).json({
                message:err.message,
                status:"fail",
                data:null
            });//خطأ في التحقق من الصحة 
        }

        res.status(500).json({
            message:err.message,
            status:"fail",
            data:null
        });//خطأ في الخادم الداخلي
    }
}



//get doctor details by id الحصول على تفاصيل الدكتور
const getDoctorDetails=async(req,res)=>
{
    try{
        const doctorId=req.params.id;//نجيب ال id من ال url
        const doctor=await doctorModel.findById(doctorId).select("name specialization about workHrs email");//بجيب الدكتور بال id
        if(!doctor)
        {
            return res.status(404).json({
                message:"Doctor not found",
                status:"fail",
                data:null
            });//الدكتور غير موجود
        }
        res.status(200).json({
            message:"Doctor found successfully",
            status:"success",
            data:doctor
        })//نجح البحث على الدكتور


    }catch(err){
        res.status(500).json({
            message:err.message,
            status:"fail",
            data:null
        });//خطأ في الخادم الداخلي  
    }

}


//get all doctors الحصول على جميع الأطباء
const getAllDoctors=async(req,res)=>
{
    try{
        const doctors=await doctorModel.find().select("name specialization about workHrs email");//بجيب جميع الأطباء مع تحديد الحقول المطلوبة فقط   
        if(doctors.length===0)
        {
            res.status(404).json({
                message:"No doctors found",
                status:"fail",
                data:null});//لا يوجد أطباء 
        }
        res.status(200).json(
            {
                message:"Doctors found successfully",
                status:"success",
                data:doctors
            }
        )//تم العثور على الأطباء بنجاح
    }catch(err){
        res.status(500).json(
            {
                message:err.message,
                status:"fail",
                data:null
            }
        )
    }
}







module.exports={createDoctor,getDoctorDetails,getAllDoctors};//استيراد الفانكشنز في ملفات أخرى