const Docters = require('../models/docters');
const config = require('../config');

module.exports = {

    addDocter(req, res, next) {

        Docters.findOne({ username: req.body.username })
            .then((founded) => {
                if (founded) {
                    res.send({ message: 'username already exists' });
                }
                else {
                    Docters.create(req.body)
                        .then((newDocter) => {
                            var doc = {
                                username: newDocter.username,
                                docter_name: newDocter.docterName
                            }
                            res.send(doc)
                        })
                        .catch(next)
                }
            })
            .catch(next)
    },

    login(req, res, next) {

        var currentDocter = {
            username: req.user.username,
            docterName: req.user.docterName,
            token: config.tokenForUser(req.user)
        }
        res.send(currentDocter);
    }
}