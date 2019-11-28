var appRoot = require('app-root-path');
var winston = require('winston');
var config = require('config');

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
    transports: [
        new winston.transports.File(config.get('winston_options.file')),
        new winston.transports.Console(config.get('winston_options.console'))
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message) {
        logger.info(message);
    },
};


module.exports = logger;

