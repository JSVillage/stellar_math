var mongoose = require('mongoose');
var Q = require('q');

var operation = {
    '+': function (x, y) { return x + y; },
    '-': function (x, y) { return x - y; },
    '×': function (x, y) { return x * y; },
    '÷': function (x, y) { return x / y; }
};

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Level = new Schema({
    id: ObjectId,
    name: {type: String, enum: ['addition','subtraction','multiplication','division'] },
    progress: {type: Number, min: 0, max: 100},
    score: {type: Number, min: 0, max: 100},
    startTime: Date,
    completedTime: Date,
    value1: Number,
    value2: Number,
    operator: {type: String, enum: ['+','-','×','÷'] },
    answer: Number,
    instructions: String
});

Level.set('toJSON', {
    transform: function(doc, json) {
        delete json.answer;
        return json;
    }
});

Level.methods.newLevel = function(min, max, name) {
    var level = this;
    var deferred = Q.defer();

    try {
        level.name = name || level.name;
        level.value1 = Math.floor(Math.random() * max) + min;
        level.value2 = Math.floor(Math.random() * max) + min;
        level.operator = getOperator(level.name);
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
};

function getOperator(levelName) {
    switch (levelName) {
        case 'addition':
            return '+';
        case 'subtraction':
            return '-';
        case 'multiplication':
            return '×';
        case 'division':
            return '÷';
    }
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

module.exports = mongoose.model('Level', Level);