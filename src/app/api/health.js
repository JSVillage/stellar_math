var pJson = require('./../../../package.json');

exports.status = function(req, res) {
    var result = new SM.model.Result(SM.result.OKAY.status, SM.result.OKAY.message);
    var healthMessage = new SM.model.HealthMessage(process.env.NODE_ENV, pJson.name, pJson.version);
    var response = new SM.model.Response(result, healthMessage);
    res.send(response);
};