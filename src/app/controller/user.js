var User = require('./../model/User');

exports.user = function( req, res ) {
    User.findById(req.session.user)
    .then(function(user){
        var data = {
            name: user.name,
            remainingPoints: 42,
            totalPoints: 58,
            skills: 'Counting'
        };
        return res.render( 'user', {user: data} );
    })
    .catch(function(err){
        return res.send(err);
    });
};