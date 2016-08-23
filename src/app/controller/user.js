exports.user = function( req, res ) {
    var user = {
        username: 'player',
        remainingPoints: 20,
        totalPoints: 40
    };
    res.render( 'user', {user: user} );
};