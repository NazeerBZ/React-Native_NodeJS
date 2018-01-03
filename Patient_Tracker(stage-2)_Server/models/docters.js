const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('../crypto.js');

const docterSchema = new Schema({

    username: {
        type: String,
        required: true
    },

    docterName: {
        type: String,
        required: true
    },

    docterEmail: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        minlength: [6, 'password must be atleast 6 characters long']
    }
})

docterSchema.pre('save', function (next) {
    this.password = crypto.encrypt(this.password);
    next();
    // return next();
})

docterSchema.methods.comparePassword = function (requestedPassword, callback) {
    let isMatch, err;
    if (requestedPassword === crypto.decrypt(this.password)) {
        isMatch = true;
        err = null;
        callback(err, isMatch)
    }
    else {
        isMatch = false;
        err = 'please enter a correct password';
        callback(err, isMatch)
    }
}

const Docters = mongoose.model('docters', docterSchema);

module.exports = Docters;
