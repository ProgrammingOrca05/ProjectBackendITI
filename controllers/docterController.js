const doctorModel=require("../Models/Doctor");





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


//update doctor details تحديث تفاصيل الدكتور
const updateDoctorDetails=async(req,res)=>{

    try{
        const doctorId=req.user.id;//بجيب ال id من ال token
        const updatedDoctor=await doctorModel.findByIdAndUpdate(doctorId,req.body,{new:true,runValidators:true}).select("name specialization about workHrs email");//بجيب الدكتور بال id وبحدثه
        
        if(!updatedDoctor)
        {
            return res.status(404).json({message:"Doctor not found",status:"fail",data:null});//الدكتور غير موجود
        }

        res.status(200).json({
            message:"Doctor updated successfully",
            status:"success",
            data:updatedDoctor
        })//تم تحديث الدكتور بنجاح  

    }catch(err){
        res.status(500).json({
            message:err.message,
            status:"fail",
            data:null
        });//خطأ في الخادم الداخلي  

    }   
}

//contorl pannel for doctor لوحة تحكم الدكتور
const controlPannel=async(req,res)=>{
    try{
        const doctorId=req.user.id;//بجيب ال id من ال token
        const doctor=await doctorModel.findById(doctorId).select("-password");//بجيب الدكتور بال id مع استبعاد كلمة المرور
        if(!doctor)
        {
            return res.status(404).json({message:"Doctor not found",status:"fail",data:null});//الدكتور غير موجود
        }
        return res.status(200).json({
            message:"Doctor found successfully",
            status:"success",
            data:doctor
        });//تم العثور على الدكتور بنجاح 
    }catch(err){
        return res.status(500).json({
            message:err.message,
            status:"fail",
            data:null
        });//خطأ في الخادم الداخلي  
    }
}

//delete doctor حذف دكتور   
const deleteDoctor=async(req,res)=>{
    try{
        const doctor=await doctorModel.findById(req.user.id);
        if(!doctor)
        {
            return res.status(404).json({message:"Doctor not found",status:"fail",data:null});//الدكتور غير موجود   
        }
        await doctorModel.findByIdAndDelete(req.user.id);
        return res.status(200).json({message:"Doctor deleted successfully",status:"success",data:null});//تم حذف الدكتور بنجاح  
    }catch(err){
        return res.status(500).json({
            message:err.message,
            status:"fail",
            data:null
        });//خطأ في الخادم الداخلي

    }
}



module.exports={getDoctorDetails,getAllDoctors,updateDoctorDetails,controlPannel,deleteDoctor};//استيراد الفانكشنز في ملفات أخرى