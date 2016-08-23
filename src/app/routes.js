var routes = {
    home: require('./controller/home'),
    user: require('./controller/user')
};

var api = {
    health: require('./api/health'),
    auth: require('./api/auth')
};

exports.register = function(app) {
    // controller routes
    app.get('/', routes.home.home);
    app.get('/signup', routes.home.signup);
    app.get('/signin', routes.home.signin);
    app.get('/user', routes.user.user);

    // api routes
    app.get('/health', api.health.status);
    
    app.post('/signup', api.auth.signup);
    app.post('/signin', api.auth.signin);
};