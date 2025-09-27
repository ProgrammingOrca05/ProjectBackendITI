const Patient = require('../Models/Patient');




// Get all patients

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a patient by ID

const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update a patient
const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(
            req.user.id,
            req.body,
            { new: true, 
            runValidators: true }
        );
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a patient

const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.user.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.status(200).json({ message: "Patient deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//control pannel for patient لوحة تحكم المريض
const controlPannelPatient = async (req, res) => {
    try {
            const patient=await Patient.findById(req.user.id).select("-password");//بجيب المريض بال id مع استبعاد كلمة المرور   
            if(!patient){
                res.status(404).json({message:"Patient not found",status:"fail",data:null});//المريض غير موجود
                return; 
            }
            res.status(200).json({
                message:"Patient found successfully",
                status:"success",
                data:patient
            });//تم العثور على المريض بنجاح
    }catch(err){

    }
}
module.exports = {
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    controlPannelPatient
};

