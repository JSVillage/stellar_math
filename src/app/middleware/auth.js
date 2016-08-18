var publicPaths = ['GET:/', 'GET:/health', 'POST:/signup', 'POST:/signin'];

module.exports = function() {
    return function(req, res, next) {
        if (req.session && req.session.user) {
            try {
                req.user = JSON.parse(req.session.user).sessionData;
            } catch (e) {
                delete req.session.user;
                return res.redirect('/');
            }
            return next();
        } else if (publicPaths.indexOf(req.method+':'+req.path) >= 0) {
            return next();
        } else {
            return res.redirect('/');
        }
    };
};