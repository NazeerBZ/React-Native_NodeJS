const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Routes = require('./routes/routes.js');
const express = require('express');
const app = express();
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/patientTrackerDB');
mongoose.connect('mongodb://nazeer:mojojojo3@patienttrackercluster-shard-00-00-aats6.mongodb.net:27017,patienttrackercluster-shard-00-01-aats6.mongodb.net:27017,patienttrackercluster-shard-00-02-aats6.mongodb.net:27017/test?ssl=true&replicaSet=patientTrackerCluster-shard-0&authSource=admin');

app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
// app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
Routes(app);

app.get('/', function (req, res) {
    res.render('index');
})

app.use((err, req, res, next) => {
    const message = err || err.errors[Object.keys(err.errors)[0]].message
    return res.send({ error: message || err.message });
})

module.exports = app;