var mongoose = require('mongoose');
var crypto = require('crypto');
var Q = require('q');
// var Level = require('./Level');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var operation = {
    '+': function (x, y) { return x + y; },
    '-': function (x, y) { return x - y; },
    '×': function (x, y) { return x * y; },
    '÷': function (x, y) { return x / y; }
};

var User = new Schema({
    id: ObjectId,
    email: {type: String, match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i},
    password: String,
    passwordChanged: Date,
    salt: String,
    date: {type: Date, default: Date.now},
    name: String,
    age: {type: String, enum: ['3-5','6-8','9-12','13+'] },
    currentLevel: String,
    levels: {
        addition: {
            name: {type: String, enum: ['addition'], default: 'addition' },
            progress: {type: Number, min: 0, max: 100},
            score: {type: Number, min: 0, max: 100},
            startTime: Date,
            completedTime: Date,
            value1: Number,
            value2: Number,
            operator: {type: String, enum: ['+'], default: '+' },
            answer: Number,
            instructions: String
        },
        subtraction: {
            name: {type: String, enum: ['subtraction'], default: 'subtraction' },
            progress: {type: Number, min: 0, max: 100},
            score: {type: Number, min: 0, max: 100},
            startTime: Date,
            completedTime: Date,
            value1: Number,
            value2: Number,
            operator: {type: String, enum: ['-'], default: '-' },
            answer: Number,
            instructions: String
        },
        multiplication: {
            name: {type: String, enum: ['multiplication'], default: 'multiplication' },
            progress: {type: Number, min: 0, max: 100},
            score: {type: Number, min: 0, max: 100},
            startTime: Date,
            completedTime: Date,
            value1: Number,
            value2: Number,
            operator: {type: String, enum: ['×'], default: '×' },
            answer: Number,
            instructions: String
        },
        division: {
            name: {type: String, enum: ['division'], default: 'division' },
            progress: {type: Number, min: 0, max: 100},
            score: {type: Number, min: 0, max: 100},
            startTime: Date,
            completedTime: Date,
            value1: Number,
            value2: Number,
            operator: {type: String, enum: ['÷'], default: '÷' },
            answer: Number,
            instructions: String
        }
    }
});

User.set('toJSON', {
    transform: function(doc, json) {
        delete json.password;
        delete json.salt;
        return json;
    }
});

User.methods.setPassword = function(pwd) {
    var user = this;
    var deferred = Q.defer();
    crypto.randomBytes(64, function(err, buf) {
        if (err) return deferred.reject(err);
        var str = buf.toString('hex');
        crypto.pbkdf2(pwd, str, 5000, 512, 'sha512WithRSAEncryption', function(err, encoded) {
            if (err) return deferred.reject(err);
            user.salt = str;
            user.password = Buffer(encoded, 'binary').toString('hex');
            user.passwordChanged = new Date();
            user.save(function(err){
                if (err) return deferred.reject(err);
                return deferred.resolve(user);
            });
        });
    });
    return deferred.promise;
};

User.methods.verify = function(pwd) {
    var user = this;
    var deferred = Q.defer();
    crypto.pbkdf2(pwd, this.salt, 5000, 512, 'sha512WithRSAEncryption', function(err, encoded) {
        if (err) return deferred.reject(err);
        var success = user.password === Buffer(encoded, 'binary').toString('hex');
        return success ? deferred.resolve() : deferred.reject();
    });
    return deferred.promise;
};

User.methods.beginExercise = function(levelName, min, max) {
    var user = this, level;
    var deferred = Q.defer();
    newLevel(user.levels[levelName], min, max)
    .then(function(lvl){
        level = lvl;
        user.currentLevel = level.name;
        return user.save();
    })
    .then(function(){
        return deferred.resolve(level);
    })
    .catch(function(err){
        return deferred.reject(err);
    });
    return deferred.promise;
};


function newLevel(level, min, max) {
    var deferred = Q.defer();

    try {
        level.value1 = Math.floor(Math.random() * max) + min;
        level.value2 = Math.floor(Math.random() * max) + min;
        level.answer = operation[level.operator](level.value1, level.value2);
        level.instructions = getInstructions(level.name);
    } catch (e) {
        deferred.reject(e);
    }

    level.save(function(err){
        if (err) return deferred.reject(err);
        return deferred.resolve(level);
    });
    return deferred.promise;
}

function getInstructions(levelName) {
    switch (levelName) {
        case 'addition':
            return 'Lorem ipsum dolor sit amet, et eum copiosae facilisis imperdiet. Ea malorum propriae apeirian qui. Eos justo quodsi fierent ex. Feugait vivendo vim id, ea stet dissentiunt vel, no porro primis offendit sit.';
        case 'subtraction':
            return 'Lorem ipsum dolor sit amet, et eum copiosae facilisis imperdiet. Ea malorum propriae apeirian qui. Eos justo quodsi fierent ex. Feugait vivendo vim id, ea stet dissentiunt vel, no porro primis offendit sit.';
        case 'multiplication':
            return 'Lorem ipsum dolor sit amet, et eum copiosae facilisis imperdiet. Ea malorum propriae apeirian qui. Eos justo quodsi fierent ex. Feugait vivendo vim id, ea stet dissentiunt vel, no porro primis offendit sit.';
        case 'division':
            return 'Lorem ipsum dolor sit amet, et eum copiosae facilisis imperdiet. Ea malorum propriae apeirian qui. Eos justo quodsi fierent ex. Feugait vivendo vim id, ea stet dissentiunt vel, no porro primis offendit sit.';
    }
}

module.exports = mongoose.model('User', User);