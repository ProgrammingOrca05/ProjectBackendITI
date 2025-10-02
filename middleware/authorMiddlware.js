const jwt=require("jsonwebtoken");

//authenticate token التحقق من صحة الرمز    

function authenticate(req,res,next){
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];
    if(!token)
    {
        return res.status(401).json({
            message:"Access denied! No token provided",
            status:"fail",
            data:null
        });//تم رفض الوصول! لم يتم تقديم أي رمز
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(403).json({
            message:"Invalid token",
            status:"fail",
            data:null
        });//رمز غير صالح
    }

}

module.exports=authenticate;//export middleware
