var transport = require(SM.properties.self.protocol);
var Q = require('q');

var options = {
    hostname: 'localhost',
    port: SM.properties.self.port,
    rejectUnauthorized: false,
    path: '',
    method: '',
    headers: {}
};

exports.sendRequest = function(requestOptions) {
    var deferred = Q.defer();

    options.path = requestOptions.route;
    options.method = requestOptions.method;
    options.headers = requestOptions.headers;

    var req = transport.request(options, function(res) {
        return deferred.resolve(res.statusCode);
    });
    req.on('error', function (err) {
        deferred.reject(err);
    });
    req.write(requestOptions.body);
    req.end();
    return deferred.promise;
};
