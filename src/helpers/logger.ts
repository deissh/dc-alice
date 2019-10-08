import { createLogger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint, json } = format;

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint(), json()),
  transports: [
    new transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'combined.log',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

export default logger;
