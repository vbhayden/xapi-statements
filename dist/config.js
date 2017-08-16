"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var os = require("os");
var getBooleanOption_1 = require("jscommons/dist/config/getBooleanOption");
var getNumberOption_1 = require("jscommons/dist/config/getNumberOption");
var getStringOption_1 = require("jscommons/dist/config/getStringOption");
var storageDir = process.cwd() + "/storage";
var expressPort = getNumberOption_1.default(process.env.EXPRESS_PORT, 80);
exports.default = {
    llClientInfoEndpoint: getStringOption_1.default(process.env.LL_CLIENT_INFO_ENDPOINT, "http://localhost:" + expressPort + "/auth" // Defaults to the demo auth.
    ),
    lang: getStringOption_1.default(process.env.LANG, 'en'),
    defaultTimeout: getNumberOption_1.default(process.env.DEFAULT_TIMEOUT_MS, 300000),
    repoFactory: {
        authRepoName: getStringOption_1.default(process.env.AUTH_REPO, 'mongo'),
        modelsRepoName: getStringOption_1.default(process.env.MODELS_REPO, 'memory'),
        storageRepoName: getStringOption_1.default(process.env.STORAGE_REPO, 'memory'),
    },
    winston: {
        console: {
            level: getStringOption_1.default(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
        },
        cloudWatch: {
            enabled: getBooleanOption_1.default(process.env.WINSTON_CLOUDWATCH_ENABLED, false),
            level: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
            logGroupName: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-server'),
            logStreamName: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
            awsConfig: {
                accessKeyId: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID),
                secretAccessKey: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY),
                region: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_REGION),
            },
        },
    },
    express: {
        port: getNumberOption_1.default(process.env.EXPRESS_PORT, 80),
        customRoute: getStringOption_1.default(process.env.EXPRESS_CUSTOM_ROUTE, 'status'),
        customRouteText: getStringOption_1.default(process.env.EXPRESS_CUSTOM_ROUTE_TEXT, 'ok'),
        morganDirectory: getStringOption_1.default(process.env.EXPRESS_MORGAN_DIRECTORY, storageDir + "/accessLogs"),
        bodyParserLimit: getStringOption_1.default(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
    },
    service: {
        enableConflictChecks: getBooleanOption_1.default(process.env.SERVICE_CHECK_CONFLICTS, true),
        enableAttachmentValidation: getBooleanOption_1.default(process.env.SERVICE_CHECK_ATTACHMENTS, true),
        enableVoidingChecks: getBooleanOption_1.default(process.env.SERVICE_CHECK_VOIDS, true),
        enableStatementCreation: getBooleanOption_1.default(process.env.SERVICE_CREATE_STATEMENTS, true),
        enableAttachmentCreation: getBooleanOption_1.default(process.env.SERVICE_CREATE_ATTACHMENTS, true),
        enableVoiding: getBooleanOption_1.default(process.env.SERVICE_UPDATE_VOIDS, true),
        enableReferencing: getBooleanOption_1.default(process.env.SERVICE_UPDATE_REFS, true),
        awaitUpdates: getBooleanOption_1.default(process.env.SERVICE_AWAIT_UODATES, true),
    },
    storage: {
        local: {
            storageDir: getStringOption_1.default(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
        },
        s3: {
            bucketName: getStringOption_1.default(process.env.FS_S3_BUCKET, 'xapi-server'),
            subFolder: getStringOption_1.default(process.env.FS_S3_BUCKET_SUBFOLDER, '/storage'),
            awsConfig: {
                accessKeyId: getStringOption_1.default(process.env.FS_S3_ACCESS_KEY_ID),
                secretAccessKey: getStringOption_1.default(process.env.FS_S3_SECRET_ACCESS_KEY),
                region: getStringOption_1.default(process.env.FS_S3_REGION),
                sslEnabled: true,
                apiVersion: '2006-03-01',
                signatureVersion: 'v4',
            },
        },
    },
    mongo: {
        url: getStringOption_1.default(process.env.MONGO_URL, 'mongodb://localhost:27017/xapiserver')
    },
};
//# sourceMappingURL=config.js.map