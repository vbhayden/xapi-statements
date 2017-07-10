import { config } from 'dotenv';
config();

import { S3 } from 'aws-sdk';
import * as boolean from 'boolean';
import { defaultTo } from 'lodash';
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
    console: {
      level: process.env.WINSTON_CONSOLE_LEVEL || 'info',
    },
    cloudWatch: {
      enabled: boolean(process.env.WINSTON_CLOUDWATCH_ENABLED) || false,
      level: process.env.WINSTON_CLOUDWATCH_LEVEL || 'info',
      logGroupName: process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME || 'xapi-server',
      logStreamName: process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME,
      awsConfig: {
        accessKeyId: process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY || '',
        region: process.env.WINSTON_CLOUDWATCH_REGION || '',
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
  service: {
    enableConflictChecks: defaultTo<boolean>(
      boolean(process.env.SERVICE_CHECK_CONFLICTS), true
    ),
    enableAttachmentValidation: defaultTo<boolean>(
      boolean(process.env.SERVICE_CHECK_ATTACHMENTS), true
    ),
    enableVoidingChecks: defaultTo<boolean>(
      boolean(process.env.SERVICE_CHECK_VOIDS), true
    ),
    enableStatementCreation: defaultTo<boolean>(
      boolean(process.env.SERVICE_CREATE_STATEMENTS), true
    ),
    enableAttachmentCreation: defaultTo<boolean>(
      boolean(process.env.SERVICE_CREATE_ATTACHMENTS), true
    ),
    enableVoiding: defaultTo<boolean>(
      boolean(process.env.SERVICE_UPDATE_VOIDS), true
    ),
    enableReferencing: defaultTo<boolean>(
      boolean(process.env.SERVICE_UPDATE_REFS), true
    ),
    awaitUpdates: defaultTo<boolean>(
      boolean(process.env.SERVICE_AWAIT_UODATES), true
    ),
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
