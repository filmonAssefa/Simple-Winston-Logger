// const { createLogger, transports, format } = require("winston");
const winston = require("winston");
require("winston-mongodb");
require('dotenv').config();


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "info.log",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),

    new winston.transports.MongoDB({
      db: process.env.MONGOURL,
      collection: "winston",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    }),
  ],
});

// Example logs
logger.error('Error message: Something went wrong!');  // Critical errors that need immediate attention
logger.warn('Warning message: Deprecated function used.');  // Warnings about potential issues
logger.info('Info message: User logged in.');  // General operational information
logger.verbose('Verbose message: Process started on port 3000.');  // Detailed information for internal operations
logger.debug('Debug message: User data: { name: "Filmon", id: 07 }');  // Useful for debugging during development
logger.silly('Silly message: Function call stack depth: 10');  // Very fine-grained logs, usually unnecessary

module.exports = logger;
