var publicPaths = ['GET:/', 'GET:/health', 'GET:/signup', 'POST:/signup', 'POST:/signin'];

module.exports = function() {
    return function(req, res, next) {
        if (req.session && req.session.user) {
            return next();
        } else if (publicPaths.indexOf(req.method+':'+req.path) >= 0) {
            return next();
        } else {
            return res.redirect('/');
        }
    };
};