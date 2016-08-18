exports.local = {
    redis: {
        protocol: 'http',
        port: 6379,
        ttl: 24*60*60000
    },
    mongo: {
        host: 'localhost',
        database: 'stellarMath'
    },
    self: {
        port: 4433,
        protocol: 'https',
        session: {
            timeout: 24*60*60000,
            secret: 'sJBopbhcwBlZGZNy7Wv9okNyMN8m9FA9kvHDWqlra3rNLtAY1p'
        }
    }
};

exports.development = {
    redis: {
        protocol: 'http',
        port: 6379,
        ttl: 24*60*60000
    },
    mongo: {
        host: 'localhost',
        database: 'stellarMath'
    },
    self: {
        port: 4433,
        protocol: 'https',
        session: {
            timeout: 24*60*60000,
            secret: 'sJBopbhcwBlZGZNy7Wv9okNyMN8m9FA9kvHDWqlra3rNLtAY1p'
        }
    }
};

exports.preprod = {
    redis: {
        protocol: 'http',
        host:'localhost',
        port: 6379,
        ttl: 24*60*60000
    },
    mongo: {
        host: 'localhost',
        database: 'stellarMath'
    },
    self: {
        port: 4433,
        protocol: 'https',
        session: {
            timeout: 24*60*60000,
            secret: 'sJBopbhcwBlZGZNy7Wv9okNyMN8m9FA9kvHDWqlra3rNLtAY1p'
        }
    }
};

exports.production = {
    redis: {
        protocol: 'http',
        host:'localhost',
        port: 6379,
        ttl: 24*60*60000
    },
    mongo: {
        host: 'localhost',
        database: 'stellarMath'
    },
    self: {
        port: 4433,
        protocol: 'https',
        session: {
            timeout: 24*60*60000,
            secret: 'sJBopbhcwBlZGZNy7Wv9okNyMN8m9FA9kvHDWqlra3rNLtAY1p'
        }
    }
};