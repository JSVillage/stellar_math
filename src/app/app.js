global.SM = global.SM || {};
if (process.env.NODE_ENV == 'production') {
    SM.properties = require('./properties').production;
} else if (process.env.NODE_ENV == 'preprod') {
    SM.properties = require('./properties').preprod;
} else if (process.env.NODE_ENV == 'development') {
    SM.properties = require('./properties').development;
} else {
    process.env.NODE_ENV = 'local';
    SM.properties = require('./properties').local;
}

var cluster = require('cluster');
var numWorkers = process.env.NODE_ENV == 'local' || process.env.TEST ? 1 : require('os').cpus().length;
require('./util/extensions');
require('./util/globalExtensions');
SM.result = require('./util/result').result;
require('./model');


if (cluster.isMaster && !process.env.TEST) {
    var workerCount = 0;
    console.info('Environment: ' + process.env.NODE_ENV);

    var i = 0;
    for (i; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.info(`worker ${worker.process.pid} online`);
    });

    cluster.on('exit', (worker) => {
        console.info(`worker ${worker.process.pid} died`);
        // cluster.fork();
    });

    cluster.on('message', () => {
        if (workerCount == 0 ) console.info(`app started on ${SM.properties.self.port}`);
    });
} else {
    var express = require('express');
    var app = express();
    var server = require('https');
    var compression = require('compression');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var redis = require('redis');
    var redisClient = redis.createClient();
    var redisStore = require('connect-redis')(session);
    var fs = require('fs');
    var path = require('path');
    var hbs = require('express-handlebars').create({
        helpers: require('./util/hbsHelpers.js').handlebars,
        extname: '.hbs',
        partialsDir: __dirname + '/views/partials'
    });

    var sess = {
        store: new redisStore({
            host: SM.properties.redis.host,
            port: SM.properties.redis.port,
            client: redisClient,
            ttl: SM.properties.redis.ttl
        }),
        secret: SM.properties.self.session.secret,
        cookie: {
            maxAge: SM.properties.self.session.timeout
        },
        resave: false,
        saveUninitialized: false
    };

    if (process.env.NODE_ENV == 'production') sess.cookie.secure = true;

    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');
    app.set('views', __dirname+'/views');
    app.use(compression());
    app.use(bodyParser.json({
        type: 'application/json'
    }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    console.info( path.join(__dirname + '/../public') );
    app.use('/static/css', express.static(__dirname + '/../public/css'));
    app.use('/static/font', express.static(__dirname + '/../public/font'));
    app.use('/static/img', express.static(__dirname + '/../public/img'));
    app.use('/static/js', express.static(__dirname + '/../public/js'));
    if (!process.env.TEST) app.use(require('./middleware/logging')());
    if (!process.env.TEST) app.use(require('./middleware/auth')());
    
    require('./routes').register(app);

    var opts = {
        key: fs.readFileSync(__dirname+'/util/certs/localhost.key', 'utf8'),
        cert: fs.readFileSync(__dirname+'/util/certs/localhost.crt', 'utf8')
    };

    server.createServer(opts, app).listen(SM.properties.self.port, function () {
        if (process.env.TEST && SM.EMITTER) SM.EMITTER.emit('app-started');
        else process.send('app-started');
    });
}