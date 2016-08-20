exports.signup = {
    invalidEmail: {
        email: 'INVALID',
        password: 'TEST',
        age: 1,
        name: 'TEST'
    },
    invalidReq: {
        email: 'TEST@TEST.com',
        password: 'TEST',
    },
    existing: {
        email: 'test@test.com',
        password: 'TEST',
        age: 1,
        name: 'TEST'
    }
};

exports.signin = {
    invalidReq: {
        email: 'TEST@TEST.com'
    },
    validReq: {
        email: 'test@test.com',
        password: 'TEST'
    },
    unknownEmail: {
        email: 'akpratt@asu.edu',
        password: 'TEST'
    },
    invalidPswd: {
        email: 'test@test.com',
        password: 'test'
    }
};