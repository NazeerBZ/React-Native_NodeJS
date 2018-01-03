//controllers
const DocterController = require('../controllers/docterController');
const PatientController = require('../controllers/patientController');
//Passport 
const passport = require('passport');
const passportServices = require('../services/passport.js');

const requireDocterExistence = passport.authenticate('local-docter', { session: false });
const requireAuthOfDocter = passport.authenticate('jwt-docter', { session: false });

function Routes(app) {

    app.post('/api/addDocter', DocterController.addDocter);

    app.post('/api/login', requireDocterExistence, DocterController.login);

    app.post('/api/addPatient', requireAuthOfDocter, PatientController.addPatient);

    app.get('/api/getAllPatient', requireAuthOfDocter, PatientController.getAllPatient);

    app.put('/api/updatePatient', requireAuthOfDocter, PatientController.updatePatient);

    app.delete('/api/deletePatient', requireAuthOfDocter, PatientController.deletePatient);

}

module.exports = Routes;