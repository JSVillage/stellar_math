var routes = {
    home: require('./controller/home'),
    exercise: require('./controller/exercise'),
    user: require('./controller/user')
};

var api = {
    health: require('./api/health'),
    auth: require('./api/auth')
};

exports.register = function(app) {
    // controller routes
    // app.get('/', routes.home.home);
    app.get('/', routes.home.signin);
    app.get('/signup', routes.home.signup);
    app.get('/signin', routes.home.signin);
    app.get('/user', routes.user.user);

    app.get('/exercise/addition', routes.exercise.addition);
    app.get('/exercise/begin', routes.exercise.begin);
    app.get('/exercise/check', routes.exercise.check);

    // api routes
    app.get('/health', api.health.status);

    app.post('/signup', api.auth.signup);
    app.post('/signin', api.auth.signin);
};