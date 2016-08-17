var mongoose = require('mongoose');
var crypto = require('crypto');
var Q = require('q');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var User = new Schema({
    id: ObjectId,
    email: {type: String, match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i},
    password: String,
    passwordChanged: Date,
    salt: String,
    date: {type: Date, default: Date.now}
});

User.set('toJSON', {
    transform: function(doc, json) {
        delete json.password;
        delete json.salt;
        return json;
    }
});

User.methods.setPassword = function(pwd) {
    var deferred = Q.defer();
    crypto.randomBytes(64, function(err, buf) {
        if (err) return deferred.reject(err);
        var str = buf.toString('hex');
        crypto.pbkdf2(pwd, str, 5000, 512, 'sha512WithRSAEncryption', function(err, encoded) {
            if (err) return deferred.reject(err);
            this.salt = str;
            this.password = Buffer(encoded, 'binary').toString('hex');
            this.passwordChanged = new Date();
            return deferred.resolve(this);
        });
    });
    return deferred.promise;
};

User.methods.check = function(pwd) {
    var deferred = Q.defer();
    crypto.pbkdf2(pwd, this.salt, 5000, 512, 'sha512WithRSAEncryption', function(err, encoded) {
        if (err) return deferred.reject(err);
        var success = this.password === Buffer(encoded, 'binary').toString('hex');
        return deferred.resolve(success);
    });
};

module.exports = mongoose.model('User', User);