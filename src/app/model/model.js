var lockKeys = function(obj) {
    for (var key in obj) {
        this[key] = undefined;
        Object.defineProperty(this,key,{
            configurable: true,
            writeable: false
        });
    }
    Object.preventExtensions(this);
};

var defineGetter = function(obj, key) {
    obj.prototype[`get${key.capitalizeFirstLetter()}`] = function() {
        return this[key];
    };
};

var defineSetter = function(obj, key, restrictions) {
    obj.prototype[`set${key.capitalizeFirstLetter()}`] = function(val) {
        if (!val) return;
        if (restrictions && restrictions.type && typeof val !== restrictions.type) throw new Error(`${key} type must be a ${restrictions.type}\n`);
        if (restrictions && restrictions.values && restrictions.values.indexOf(val) < 0) throw new Error(`${key}'s value must be one of the following: ${restrictions.values.join(', ')}\n`);
        if (restrictions && restrictions.instanceOf && !(val instanceof restrictions.instanceOf)) throw new Error(`${key} is spawned from an unsupported instance\n`);
        Object.defineProperty(this,key,{
            configurable: true,
            writeable: false,
            value: val
        });
    };
};

// this obj is extensible, regular push, pop, shift, unshift will work. v2 add support for all that stuff.
var definePusher = function(obj, key, restrictions) {
    obj.prototype[`push${key.capitalizeFirstLetter()}`] = function(val) {
        if (!val) return;
        if (restrictions && restrictions.type && typeof val !== restrictions.type) throw new Error(`${key} type must be a ${restrictions.type}\n`);
        if (restrictions && restrictions.values && restrictions.values.indexOf(val) < 0) throw new Error(`${key}'s value must be one of the following: ${restrictions.values.join(', ')}\n`);
        if (restrictions && restrictions.instanceOf && !(val instanceof restrictions.instanceOf)) throw new Error(`${key} is spawned from an unsupported instance\n`);
        if (!this[key]) Object.defineProperty(this,key,{
            configurable: true,
            writeable: false,
            value: new Array()
        });
        this[key].push(val);
    };
};

exports.lockKeys = lockKeys;
exports.defineGetter = defineGetter;
exports.defineSetter = defineSetter;
exports.definePusher = definePusher;