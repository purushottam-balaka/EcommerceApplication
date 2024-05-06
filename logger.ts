import winston from 'winston';

 export const infologger = winston.createLogger({
  level: 'info', // Set log level
  format: winston.format.json(), // Use JSON format for logs
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'logfile.log' }) // Log to a file
  ]
});

export const errorLogger = winston.createLogger({
  level: 'error', // Set the log level to 'error'
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.simple() // Simple log format
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }) // Log errors to a separate file
  ]
});


