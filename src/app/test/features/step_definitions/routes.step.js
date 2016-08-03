var models = require('./../../support/models');

module.exports = function () {

    var requestOptions = {
        method: '',
        route: '',
        body: ''
    };

    this.Given(/^I make a "([^"]*)" request to stellar_math on "([^"]*)"$/, function (method, route, callback) {
        requestOptions.method = method;
        requestOptions.route = route;
        callback();
    });

    this.Given(/^with a "([^"]*)" body in the request$/, function (valid, callback) {
        requestOptions.body = getBodyForRoute(requestOptions.route, valid);
        callback();
    });

    this.Then(/^a "([^"]*)" result is received$/, function (result, callback) {
        require('./../../support/request').sendRequest(requestOptions)
        .then(function(res){
            if ( !res || !res.result || !res.result.status || !res.result.message ) return callback(new Error('incorrect response message'));
            if (res.result.status == SM.result[result].status && res.result.message == SM.result[result].message) {
                callback();
            } else {
                callback(new Error(`expected ${JSON.stringify(SM.result[result].status)} result but got ${JSON.stringify(res.result.status)}`));
            }
            return callback(new Error('should never get here'));
        })
        .catch(function(err){
            callback.fail(err);
        });
    });

    this.Then(/^a "([^"]*)" status code is received$/, function (status, callback) {
        requestOptions.headers = {
            'Content-Type': 'text/html',
            'Accept': 'text/html'
        };
        require('./../../support/request').sendRequest(requestOptions, true)
        .then(function(res){
            if (res == status) {
                return callback();
            }
            return callback(new Error(`expected ${status} result but got ${res}`));
        })
        .catch(function(err){
            callback.fail(err);
        });
    });

};

function getBodyForRoute(route, valid) {

    // valid = success
    // invalid = nonexistent fields
    // NA = empty

    if (valid == 'NA') return '';

    switch (route) {
        case '/basePath/method':
            return JSON.stringify( models.basePath.method[valid] );
    }
    return '';
}
