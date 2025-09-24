const exp=require("express");
const app=exp();
const mongo=require("mongoose");

app.use(exp.json());

mongo.connect("mongodb://localhost:27017/").then(()=>console.log("DB connected")).catch(err=>console.log(err));




app.listen(1080,()=>console.log("server is running on port 1080"));