const exp=require("express");
const app=exp();
const mongo=require("mongoose");
const doctorAPI=require("./Routes/doctorAPI");
const patientAPI=require("./Routes/patientAPI");
const dotenv=require("dotenv");
dotenv.config();

app.use(exp.json());

mongo.connect(process.env.MONGO_URL).then(()=>console.log("DB connected")).catch(err=>console.log(err));

app.use("/",doctorAPI);
app.use("/",patientAPI);


app.listen(process.env.PORT,()=>console.log("server is running on port 1080"));