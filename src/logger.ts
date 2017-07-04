import commonWinston from 'jscommons/dist/winston';
import config from './config';

export default commonWinston({
  console: {
    level: config.winston.level,
  },
  cloudWatch: {
    level: config.winston.level,
    enabled: config.winston.enableAws,
    logGroupName: config.winston.aws.logGroupName,
    awsConfig: {
      accessKeyId: config.winston.aws.awsConfig.accessKeyId || '',
      secretAccessKey: config.winston.aws.awsConfig.secretAccessKey || '',
      region: config.winston.aws.awsConfig.region || '',
    },
  }
});
