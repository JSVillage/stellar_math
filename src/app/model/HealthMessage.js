var model = require('./model');

var healthMessage = {
    environment: undefined,
    service: undefined,
    version: undefined
};

var HealthMessage = function(environment, service, version) {
    model.lockKeys.call(this, healthMessage);
    if (environment) this.setEnvironment(environment);
    if (service) this.setService(service);
    if (version) this.setVersion(version);
    return this;
};

model.defineGetter(HealthMessage, 'environment');
model.defineSetter(HealthMessage, 'environment', {type: 'string', values: ['local', 'development', 'preprod', 'production']});

model.defineGetter(HealthMessage, 'service');
model.defineSetter(HealthMessage, 'service', {type: 'string', values: ['stellar-math']});

model.defineGetter(HealthMessage, 'version');
model.defineSetter(HealthMessage, 'version', {type: 'string'});

module.exports = HealthMessage;