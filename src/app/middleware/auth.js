var publicPaths = ['GET:/', 'GET:/health', 'GET:/signup', 'GET:/signin', 'GET:/user', 'POST:/signup', 'POST:/signin'];

module.exports = function() {
    return function(req, res, next) {
        if (req.session && req.session.user && req.session.authenticated) {
            return next();
        } else if (publicPaths.indexOf(req.method+':'+req.path) >= 0) {
            return next();
        } else {
            return res.redirect('/');
        }
    };
};