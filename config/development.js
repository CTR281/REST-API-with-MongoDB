const config = {
    database: { //database connection info
        host: 'clusterdfsromarin-jna6x.mongodb.net',
        port: '',
        name: 'RPG_DEV',
    },
    winston_options: {
        file: {
            level: "warn"
        },
        console: {
            level: "debug"
        }
    }
};

module.exports = config;