import winston from 'winston';
import expressWinston from 'express-winston';

const myFormat = winston.format.printf(
  ({ level, message, timestamp, ...metadata }) => {
    let msg = `[${process.env.NODE_ENV?.toUpperCase() ?? 'NO ENV'}][${level}][${
      timestamp as string
    }]: ${message} `;
    if (level === 'debug' && metadata) {
      msg += JSON.stringify(metadata);
    }
    return msg;
  },
);

const apiLogger = expressWinston.logger({
  level: process.env.LOGGER_LEVEL,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.timestamp(),
    myFormat,
  ),
  transports: [new winston.transports.Console()],
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
});

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.timestamp(),
    myFormat,
  ),
  transports: [new winston.transports.Console()],
});

export { apiLogger, logger };
