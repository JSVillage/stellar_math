var User = require('./../model/User');
var Q = require('q');

exports.signup = function(req, res) {
    var email = req.body.email, password = req.body.password, name = req.body.name, age = req.body.age;
    var user;

    if (!email || !password || !name || !age) {
        return res.sendStatus(400);
    }

    User.count({email: email})
    .then(function(count){
        if (count > 0) return res.status(400).send({err: 'email is already in use'});

        user = new User();
        user.set({
            email: email,
            name: name,
            age: age
        });
        return user.setPassword(password);
    })
    .then(function(){
        return user.save();
    })
    .then(function(){
        return newSession(req, user);
    })
    .then(function(){
        // send a welcome email, validation email - if time (v2)
        return res.send(user);
    })
    .catch(function(e){
        var msg = mongooseErrMessage(e);
        var status = msg ? 400 : 500;
        return res.status(status).send({err: msg || 'user could not be created'});
    });
};

exports.signin = function(req, res) {
    var email = req.body.email, password = req.body.password;
    var user;

    if (!email || !password) {
        return res.sendStatus(400);
    }

    User.findOne({email: email})
    .then(function(usr){
        user = usr;
        if (!user) return res.status(401).send({err: 'unable to login'});
        return user.verify(password);
        // do any lastLogged in stuff?
    })
    .then(function(){
        return newSession(req, user);
    })
    .then(function(){
        // if `stay logged in` option
        // req.session.cookie.expires = null
        // req.session.cookie.maxAge = null
        return res.sendStatus(204);
    })
    .catch(function(){
        return res.status(401).send({err: 'unable to login'});
    });
};

function newSession(req, user) {
    var deferred = Q.defer();
    if (req && req.session) req.session.regenerate(function(err) {
        if (err) return deferred.reject();
        req.session.authenticated = true;
        req.session.user = user.id;
    });
}