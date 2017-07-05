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
    awsConfig: {
      accessKeyId: config.winston.cloudWatch.awsConfig.accessKeyId || '',
      secretAccessKey: config.winston.cloudWatch.awsConfig.secretAccessKey || '',
      region: config.winston.cloudWatch.awsConfig.region || '',
    },
  }
});
