var appRoot = require("app-root-path");

const config = {
    server: { // server info
        port: "8080"
    },
    database: { //database connection info
        host: 'localhost',
        port: '27017',
        name: 'default',
        user: 'user',
        password: 'password',
    },
    winston_options: {
        /**
         * level - Level of messages to log.
         * handleExceptions - Catch and log unhandled exceptions.
         * colorize - Colorize the output. This can be helpful when looking at console logs.
         * json - Records log data in JSON format.
         * filename - The file to be used to write log data to.
         * maxsize - Max size of log file, in bytes, before a new file will be created.
         * maxFiles - Limit the number of files created when the size of the logfile is exceeded.
         */
        file: {
            level: 'info',
            handleExceptions: true,
            colorize: false,
            json: true,
            filename: `${appRoot}/logs/app.log`,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        },
        console: {
            level: 'debug',
            handleExceptions: true,
            colorize: true,
            json: false,
        },
    }
};

module.exports = config;