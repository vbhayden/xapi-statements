import * as moment from 'moment';
import * as winston from 'winston';
import config from './config';

const getTime = () => moment().format('YYYY-MM-DD HH:mm:ss:SSS');

winston.cli();
export default new winston.Logger({
  exitOnError: false,
  transports: [
    new (winston.transports.Console)({
      handleExceptions: true,
      colorize: true,
      timestamp: getTime,
      prettyPrint: true,
      humanReadableUnhandledException: true,
      level: config.logLevel,
      stderrLevels: ['error']
    })
  ]
});
