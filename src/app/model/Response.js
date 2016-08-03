var model = require('./model');

var response = {
    result: undefined,
    message: undefined
};

var Response = function(result, message) {
    model.lockKeys.call(this, response);
    if (result) this.setResult(result);
    if (message) this.setMessage(message);
    return this;
};

model.defineGetter(Response, 'result');
model.defineSetter(Response, 'result', {type: 'object', instanceOf: SM.model.Result});

model.defineGetter(Response, 'message');
model.defineSetter(Response, 'message');

module.exports = Response;