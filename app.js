const exp=require("express");
const app=exp();
const mongo=require("mongoose");
const doctorAPI=require("./Routes/doctorAPI");

app.use(exp.json());

mongo.connect("mongodb+srv://ehgzly_2025:RainBow2025@cluster0.88azvyc.mongodb.net/").then(()=>console.log("DB connected")).catch(err=>console.log(err));

app.use("/",doctorAPI);


app.listen(1080,()=>console.log("server is running on port 1080"));