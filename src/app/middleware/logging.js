module.exports = function() {
    return function(req, res, next) {
        var ID = randomString(25);

        var endHolder = res.end;
        res.end = function() {
            var response = '';
            var exitLogData = {
                time: Date.now(),
                status: res.statusCode,
                response: response,
                request: ID
            };
            console.info(JSON.stringify(exitLogData));
            endHolder.apply(res, arguments);
        };

        var entryLogData = {
            time: Date.now(),
            ip: req.ip,
            method: req.method,
            path: req.path,
            body: req.body,
            params: req.params,
            request: ID
        };
        console.info(JSON.stringify(entryLogData));
        next();
    };
};