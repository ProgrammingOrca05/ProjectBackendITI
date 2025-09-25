const exp=require("express");
const app=exp();
const mongo=require("mongoose");

app.use(exp.json());

mongo.connect("mongodb+srv://ehgzly_2025:RainBow2025@cluster0.88azvyc.mongodb.net/").then(()=>console.log("DB connected")).catch(err=>console.log(err));




app.listen(1080,()=>console.log("server is running on port 1080"));