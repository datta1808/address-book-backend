//Importing winston & destructuring it's methods
const { createLogger, transports, format } = require('winston');

//Creating logger object
const logger = createLogger({
  transports: [
    // File transport - transport is where the log is saved
    new transports.File({
      // Create the log directory if it does not exist
      filename: './loggers/info.log',
      // by default the log level is 'info'
      level: 'info', 
      format: format.combine(format.timestamp(), format.json()),
    }),

    // File transport
    new transports.File({
      // Create the log directory if it does not exist
      filename: './loggers/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

// export logger
module.exports = logger;