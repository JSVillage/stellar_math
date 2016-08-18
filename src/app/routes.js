var routes = {
    home: require('./controller/home')
};

var api = {
    health: require('./api/health'),
    auth: require('./api/auth')
};

exports.register = function(app) {
    // controller routes
    app.get('/', routes.home.home);
    app.get('/signup', routes.home.signup);

    // api routes
    app.get('/health', api.health.status);
    
    app.post('/signup', api.auth.signup);
};