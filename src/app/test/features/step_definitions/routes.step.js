var models = require('./../../support/models');

module.exports = function () {

    var requestOptions = {
        method: '',
        route: '',
        body: '',
        headers: {}
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

    this.Then(/^a "([^"]*)" status is received from the api$/, function (status, callback) {
        requestOptions.headers['Content-Type'] = 'application/json';
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

    this.Then(/^a "([^"]*)" status is received with the html page$/, function (status, callback) {        
        requestOptions.headers['Content-Type'] = 'text/html';
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

function getBodyForRoute(route, req) {

    if (req == 'NA') return '';

    switch (route) {
        case '/signup':
            return JSON.stringify( models.signup[req] );
        case '/signin':
            return JSON.stringify( models.signin[req] );
    }
    return '';
}
