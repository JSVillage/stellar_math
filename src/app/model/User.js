var mongoose = require('mongoose');
var crypto = require('crypto');
var Q = require('q');
var Level = require('./Level');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

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
    levels: []
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
    var i = 0;
    for (i; i < user.levels; i++) {
        if (user.levels[i].name == levelName) {
            level = user.levels[i];
            break;
        }
    }
    if (!level) level = new Level();
    level.newLevel(min, max, levelName)
    .then(function(lvl){
        user.levels.push(lvl);
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

module.exports = mongoose.model('User', User);