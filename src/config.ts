import { config } from 'dotenv';
config();

import { S3 } from 'aws-sdk';
import * as os from 'os';
import getBooleanOption from 'jscommons/dist/config/getBooleanOption';
import getNumberOption from 'jscommons/dist/config/getNumberOption';
import getStringOption from 'jscommons/dist/config/getStringOption';
const storageDir = `${process.cwd()}/storage`;
const expressPort = getNumberOption(process.env.EXPRESS_PORT, 80);

export default {
  llClientInfoEndpoint: getStringOption(
    process.env.LL_CLIENT_INFO_ENDPOINT,
    `http://localhost:${expressPort}/auth` // Defaults to the demo auth.
  ),
  lang: getStringOption(process.env.LANG, 'en'),
  defaultTimeout: getNumberOption(process.env.DEFAULT_TIMEOUT_MS, 300000),

  redis: {
    url: getStringOption(process.env.REDIS_URL, 'redis://127.0.0.1:6379/0'),
    prefix: getStringOption(process.env.REDIS_PREFIX, 'xapistatements'),
  },

  repoFactory: {
    eventsRepoName: getStringOption(process.env.EVENTS_REPO, 'redis'),
    authRepoName: getStringOption(process.env.AUTH_REPO, 'mongo'),
    modelsRepoName: getStringOption(process.env.MODELS_REPO, 'memory'),
    storageRepoName: getStringOption(process.env.STORAGE_REPO, 'memory'),
  },

  winston: {
    console: {
      level: getStringOption(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
    },
    cloudWatch: {
      enabled: getBooleanOption(process.env.WINSTON_CLOUDWATCH_ENABLED, false),
      level: getStringOption(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
      logGroupName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-statements'),
      logStreamName: getStringOption(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
      awsConfig: {
        accessKeyId: getStringOption(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID),
        secretAccessKey: getStringOption(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY),
        region: getStringOption(process.env.WINSTON_CLOUDWATCH_REGION),
      },
    },
  },
  express: {
    port: getNumberOption(process.env.EXPRESS_PORT, 80),
    customRoute: getStringOption(process.env.EXPRESS_CUSTOM_ROUTE, 'status'),
    customRouteText: getStringOption(process.env.EXPRESS_CUSTOM_ROUTE_TEXT, 'ok'),
    morganDirectory: getStringOption(process.env.EXPRESS_MORGAN_DIRECTORY, `${storageDir}/accessLogs`),
    bodyParserLimit: getStringOption(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
  },
  service: {
    enableConflictChecks: getBooleanOption(process.env.SERVICE_CHECK_CONFLICTS, true),
    enableAttachmentValidation: getBooleanOption(process.env.SERVICE_CHECK_ATTACHMENTS, true),
    enableVoidingChecks: getBooleanOption(process.env.SERVICE_CHECK_VOIDS, true),
    enableStatementCreation: getBooleanOption(process.env.SERVICE_CREATE_STATEMENTS, true),
    enableAttachmentCreation: getBooleanOption(process.env.SERVICE_CREATE_ATTACHMENTS, true),
    enableVoiding: getBooleanOption(process.env.SERVICE_UPDATE_VOIDS, true),
    enableReferencing: getBooleanOption(process.env.SERVICE_UPDATE_REFS, true),
    enableActivityUpdates: getBooleanOption(process.env.SERVICE_UPDATE_ACTIVITIES, true),
    awaitUpdates: getBooleanOption(process.env.SERVICE_AWAIT_UODATES, true),
  },
  storage: {
    local: {
      storageDir: getStringOption(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
    },
    s3: {
      bucketName: getStringOption(process.env.FS_S3_BUCKET, 'xapi-server'),
      subFolder: getStringOption(process.env.FS_S3_BUCKET_SUBFOLDER, '/storage'),
      awsConfig: {
        accessKeyId: getStringOption(process.env.FS_S3_ACCESS_KEY_ID),
        secretAccessKey: getStringOption(process.env.FS_S3_SECRET_ACCESS_KEY),
        region: getStringOption(process.env.FS_S3_REGION),
        sslEnabled: true,
        apiVersion: '2006-03-01',
        signatureVersion: 'v4',
      } as S3.ClientConfiguration,
    },
  },
  mongo: {
    url: getStringOption(process.env.MONGO_URL, 'mongodb://127.0.0.1:27017/xapiserver')
  },
};
