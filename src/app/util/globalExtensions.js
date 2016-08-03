global.randomString = global.randomString || function randomString(length, characters) {
    var str = '';
    var possible = characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var strLength = length || 25;

    var i = 0;
    for (i; i < strLength; i++) {
        str += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return str;
};

global.btoa = global.btoa || function btoa(base64String) {
    return new Buffer(base64String, 'base64').toString();
};

global.atob = global.atob || function atob(asciiString) {
    var bstr = new Buffer(asciiString, 'ascii');
    return bstr.toString('base64');
};