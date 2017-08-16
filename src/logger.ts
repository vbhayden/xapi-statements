import * as winston from 'winston';
import commonWinston from 'jscommons/dist/winston';
import config from './config';

export default commonWinston({
  console: {
    level: config.winston.console.level,
  },
  cloudWatch: {
    level: config.winston.cloudWatch.level,
    enabled: config.winston.cloudWatch.enabled,
    logGroupName: config.winston.cloudWatch.logGroupName,
    logStreamName: config.winston.cloudWatch.logStreamName,
    awsConfig: {
      accessKeyId: (
        /* istanbul ignore next */
        config.winston.cloudWatch.awsConfig.accessKeyId || ''
      ),
      secretAccessKey: (
        /* istanbul ignore next */
        config.winston.cloudWatch.awsConfig.secretAccessKey || ''
      ),
      region: (
        /* istanbul ignore next */
        config.winston.cloudWatch.awsConfig.region || ''
      ),
    },
  }
}) as winston.LoggerInstance;
