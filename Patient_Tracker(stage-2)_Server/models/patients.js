const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({

    docUsername: {
        type: String,
        required: true
    },

    patientName: {
        type: String,
        required: true
    },

    diseases: {
        type: Array,
        required: true
    },

    medications: {
        type: Array,
        required: true
    },

    dateOfArrival: {
        type: String,
        required: true
    },

    cost: {
        type: String,
        required: true
    }
})

const Patients = mongoose.model('patients', patientSchema);
module.exports = Patients;
