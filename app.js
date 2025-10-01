const exp=require("express");
const app=exp();
const mongo=require("mongoose");
const doctorAPI=require("./Routes/doctorAPI");
const patientAPI=require("./Routes/patientAPI");
const appointmentAPI=require("./Routes/appointmentAPI");
const dotenv=require("dotenv");
dotenv.config();

app.use(exp.json());

// Small CORS middleware to allow the frontend (including file:// origin) to access the API
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') return res.sendStatus(200);
	next();
});

mongo.connect(process.env.MONGO_URL).then(()=>console.log("DB connected")).catch(err=>console.log(err));

app.use("/",doctorAPI);
app.use("/",patientAPI);
app.use("/",appointmentAPI);

const PORT = process.env.PORT || 1080;
app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`));
