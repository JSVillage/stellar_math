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
            password: password,
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

function newSession(req, user) {
    var deferred = Q.defer();
    if (req && req.session) req.session.regenerate(function(err) {
        if (err) return deferred.reject();
        req.session.authenticated = true;
        req.session.user = user.id;
    });
}