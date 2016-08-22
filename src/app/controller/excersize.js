exports.one = function( req, res ) {
    if (!authenticated(req)) return res.sendStatus(401);

    res.render('exercise', {level: {}, progress: {percentage: 20}});
};

// click begin, sets time on current level model, returns json with the current level