import { config } from 'dotenv';
config();

import { S3 } from 'aws-sdk';
const storageDir = `${process.cwd()}/storage`;
const expressPort = Number(process.env.EXPRESS_PORT) || 80;

export default {
  llClientInfoEndpoint: (
    process.env.LL_CLIENT_INFO_ENDPOINT ||
    `http://localhost:${expressPort}/auth` // Defaults to the demo auth.
  ),
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
      storageDir: process.env.FS_LOCAL_STORAGE_DIR || storageDir,
    },
    s3: {
      bucketName: process.env.FS_S3_BUCKET || 'xapi-server',
      subFolder: process.env.FS_S3_BUCKET_SUBFOLDER || '/storage',
      awsConfig: {
        accessKeyId: String(process.env.FS_S3_ACCESS_KEY_ID),
        secretAccessKey: String(process.env.FS_S3_SECRET_ACCESS_KEY),
        region: String(process.env.FS_S3_REGION),
        sslEnabled: true,
        apiVersion: '2006-03-01',
        signatureVersion: 'v4',
      } as S3.ClientConfiguration,
    },
  },
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/xapiserver'
  },
};
