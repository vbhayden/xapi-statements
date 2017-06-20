import * as moment from 'moment';
import * as winston from 'winston';
import * as CloudWatchTransport from 'winston-aws-cloudwatch';
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
      level: config.winston.level,
      stderrLevels: ['error']
    }),
    ...(
      config.winston.enableAws === false ? [] : [
        new CloudWatchTransport({
          level: config.winston.level,
          ...config.winston.aws,
        }),
      ]
    )
  ]
});
