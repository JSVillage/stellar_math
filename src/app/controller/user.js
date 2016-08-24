exports.user = function( req, res ) {
    var user = {
        username: 'Player',
        remainingPoints: 20,
        totalPoints: 40,
        skills: 'Counting'
    };
    res.render( 'user', {user: user} );
};