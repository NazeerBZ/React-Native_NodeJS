const Docters = require('../models/docters');
const Patients = require('../models/patients');

module.exports = {

    addPatient(req, res, next) {
        
        Patients.create(req.body)
            .then((newPatient) => {
                // console.log(newPatient)
                res.send({ message: 'Patient successfully added' })
            })
            .catch(next)
    },

    getAllPatient(req, res, next) {

        Patients.find({ docUsername: req.headers.username })
            .then((patientList) => {

                if (patientList.length !== 0) {
                    res.send({ patientList: patientList })
                }
                else {
                    res.send({ message: 'No Patient Added' })
                }
            })
            .catch(next)
    },

    updatePatient(req, res, next) {

        Patients.findByIdAndUpdate({ _id: req.body.patientId }, {
            docUsername: req.body.docUsername,
            patientName: req.body.patientName,
            diseases: req.body.diseases,
            medications: req.body.medications,
            dateOfArrival: req.body.dateOfArrival,
            cost: req.body.cost

        })
            .then((updatedPatient) => {
                res.send({ message: 'Patient Successfully Updated' });
            })
            .catch(next)
    },

    deletePatient(req, res, next) {

        Patients.findByIdAndRemove({ _id: req.headers.patientid })
            .then((deletedPatient) => {
                res.send({ message: 'Patient Successfully Deleted' })
            })
            .catch(next)
    }
}