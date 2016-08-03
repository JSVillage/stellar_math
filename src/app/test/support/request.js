var transport = require(SM.properties.self.protocol);
var Q = require('q');

var options = {
    hostname: 'localhost',
    port: SM.properties.self.port,
    rejectUnauthorized: false,
    path: '',
    method: '',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

exports.sendRequest = function(requestOptions, onlyStatusCode) {
    var deferred = Q.defer();

    options.path = requestOptions.route;
    options.method = requestOptions.method;
    if (requestOptions.headers) options.headers = requestOptions.headers;

    var req = transport.request(options, function(res) {
        if (onlyStatusCode) return deferred.resolve(res.statusCode);
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            try {
                body = JSON.parse(body);
                return deferred.resolve(body);
            } catch (e) {
                return deferred.reject(e);
            }
        });
        res.on('error', function(e) {
            return deferred.reject(e);
        });
    });
    req.on('error', function (err) {
        deferred.reject(err);
    });
    req.write(requestOptions.body);
    req.end();
    return deferred.promise;
};
