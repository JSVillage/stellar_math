exports.one = function( req, res ) {
    res.render('exercise', {level: {}, progress: {percentage: 20}});
};

// click begin, sets time on current level model, returns json with the current level