const { createLogger, format, transports } = require('winston');

export const prodcutLogger = createLogger({
  transports: [
    new transports.File({
      filename: 'logs/transaction.log',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});

export const userLogger = createLogger({
  transports: [
    new transports.File({
      filename: 'logs/users.log',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});
