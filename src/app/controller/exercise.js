var User = require('./../model/User');

exports.addition = function( req, res ) {
    User.findById(req.session.user)
    .then(function(user){
        // if ( user.levels  ) {
        //     // already has addition
        // }
        return user.beginExercise('addition', 2, 9);
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
        var level, i = 0;
        for (i; i < user.levels.length; i++) {
            if (user.levels[i].name == user.currentLevel) {
                level = user.levels[i];
                // user.levels[i].startTime = Date.now();
                break;
            }
        }
        if (level) delete level.answer;
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
        var level, i = 0;
        for (i; i < user.levels.length; i++) {
            if (user.levels[i].name == user.currentLevel) {
                level = user.levels[i];
                // user.levels[i].startTime = Date.now();
                break;
            }
        }
        return res.send(level.answer == answer);
    })
    .catch(function(err){
        return res.send(err);
    });
};