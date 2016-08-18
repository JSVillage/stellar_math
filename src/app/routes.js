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

    // api routes
    app.get('/health', api.health.status);
    
    app.post('/signup', api.auth.signup);
    app.post('/signin', api.auth.signin);
};