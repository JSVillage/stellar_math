var User = require('./../model/User');

exports.addition = function( req, res ) {
    User.findById(req.session.user)
    .then(function(user){
        return user.beginExercise('addition', 2, 6);
    })
    .then(function(level){
        return res.render('exercise', {level: level});
    })
    .catch(function(err){
        return res.send(err);
    });
};

exports.begin = function( req, res ) {
    User.findById(req.session.user)
    .then(function(user){
        var level = user.levels[user.currentLevel];
        delete level.answer;
        return res.send(level);
    })
    .catch(function(err){
        return res.send(err);
    });
};

exports.check = function( req, res ) {
    var answer = req.query.answer;
    User.findById(req.session.user)
    .then(function(user){
        var level = user.levels[user.currentLevel];
        return res.send({result: level.answer == answer});
    })
    .catch(function(){
        return res.send({result: false});
    });
};