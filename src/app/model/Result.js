var model = require('./model');

var result = {
    status: undefined,
    message: undefined
};

var Result = function(status, message) {
    model.lockKeys.call(this, result);
    if (status) this.setStatus(status);
    if (message) this.setMessage(message);
    return this;
};

var statusOptions = [];
for (var key in SM.result) {
    statusOptions.push( SM.result[key].status );
}

model.defineGetter(Result, 'status');
model.defineSetter(Result, 'status', {type: 'string', values: statusOptions});

model.defineGetter(Result, 'message');
model.defineSetter(Result, 'message', {type: 'string'});

module.exports = Result;