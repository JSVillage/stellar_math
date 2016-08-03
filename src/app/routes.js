var routes = {
    home: require('./controller/home')
};

var api = {
    health: require('./api/health')
};

exports.register = function(app) {
    app.get('/health', api.health.status);

    app.get('/', routes.home.home);
};