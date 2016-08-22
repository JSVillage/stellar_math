exports.user = function( req, res ) {
    var user = {
        username: req.session.user.name || 'player',
        remainingPoints: 20,
        totalPoints: 40
    };
    res.render( 'user', {user: user} );
};