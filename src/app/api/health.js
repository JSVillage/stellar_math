var pJson = require('./../../../package.json');

exports.status = function(req, res) {
    res.send({
        service: pJson.name,
        version: pJson.version,
        status: 'OKAY'
    });
};