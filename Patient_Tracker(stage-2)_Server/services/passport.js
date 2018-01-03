const passport = require('passport');
const Docters = require('../models/docters');
const config = require('../config');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');

//Local Strategy Docter Login
const localOptions = {
    usernameField: 'username'
}

const localForDocter = new localStrategy(localOptions, function (username, password, done) {
    Docters.findOne({ username: username })
        .then((docterObj) => {

            if (docterObj) {
                docterObj.comparePassword(password, function (err, isMatch) {
                    if (err) { return done(err, false) }

                    if (isMatch) {
                        return done(null, docterObj) //err = null; //isMatch = true;
                    }
                    else {
                        return done(err, false) //err = please enter a correct username & password; //isMatch = false;
                    }
                })
            }
            else {
                err = 'User does not exist'
                return done(err, false);
            }
        })
        .catch((err) => {
            return done(err, false)
        })
})

//Jwt Strategy for Docter
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtForDocter = new jwtStrategy(jwtOptions, function (payload, done) {

    Docters.findOne({ _id: payload.sub })
        .then((docterObj) => {

            if (docterObj) {
                return done(null, docterObj)
            }
            else {
                let err = 'you are unauthorize'
                return done(err, false)
            }
        })
        .catch((err) => {
            return done(err, false)
        })
})


// Tell passport to use these Strategies
passport.use('local-docter', localForDocter);
passport.use('jwt-docter', jwtForDocter);




