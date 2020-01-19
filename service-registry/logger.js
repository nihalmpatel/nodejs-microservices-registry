const { createLogger, format, transports } = require('winston');

const { name, version } = require('./package.json');

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: name + 'v' + version },
  transports: [
    new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple()
        )
    }),
    new transports.File({ filename: 'logs/' + name + '-error.log', level: 'error' }),
    new transports.File({ filename: 'logs/' + name + '-combined.log' })
  ]
});

module.exports = logger;