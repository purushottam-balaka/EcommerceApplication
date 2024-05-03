import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Set log level
  format: winston.format.json(), // Use JSON format for logs
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'logfile.log' }) // Log to a file
  ]
});

export default logger;
