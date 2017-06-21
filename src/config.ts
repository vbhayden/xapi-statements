import { config } from 'dotenv';
config();

const storageDir = `${process.cwd()}/storage/`;

export default {
  llClientInfoEndpoint: process.env.LL_CLIENT_INFO_ENDPOINT,
  lang: process.env.LANG || 'en',
  defaultTimeout: process.env.DEFAULT_TIMEOUT_MS || 300000,
  modelsRepoName: process.env.MODELS_REPO || 'memory',
  storageRepoName: process.env.STORAGE_REPO || 'memory',
  winston: {
    level: process.env.WINSTON_LEVEL || 'info',
    enableAws: Boolean(Number(process.env.WINSTON_AWS_ENABLED)) || false,
    aws: {
      logGroupName: process.env.WINSTON_AWS_LOG_GROUP_NAME || 'xapi-server',
      logStreamName: process.env.WINSTON_AWS_LOG_STREAM_NAME || 'xapi-server',
      createLogGroup: true,
      createLogStream: true,
      awsConfig: {
        accessKeyId: process.env.WINSTON_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.WINSTON_AWS_SECRET_ACCESS_KEY,
        region: process.env.WINSTON_AWS_REGION,
      },
    },
  },
  express: {
    port: Number(process.env.EXPRESS_PORT) || 80,
    customRoute: process.env.EXPRESS_CUSTOM_ROUTE || 'status',
    customRouteText: process.env.EXPRESS_CUSTOM_ROUTE_TEXT || 'ok',
    morganDirectory: process.env.EXPRESS_MORGAN_DIRECTORY || `${storageDir}/accessLogs`,
    bodyParserLimit: process.env.EXPRESS_BODY_PARSER_LIMIT || '5mb',
  },
  storage: {
    local: {
      attachmentsDirectory: process.env.FS_LOCAL_ATTACHMENTS_DIR || `${storageDir}/attachments`,
    },
  },
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/xapiserver'
  },
};
