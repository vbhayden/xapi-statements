"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var factory_1 = require("./factory");
var connectToMongoDb_1 = require("./utils/connectToMongoDb");
var connectToRedis_1 = require("./utils/connectToRedis");
var connectToSentinel_1 = require("./utils/connectToSentinel");
var repo = factory_1.default({
    auth: {
        facade: config_1.default.repoFactory.authRepoName,
        fake: {},
        fetch: {
            llClientInfoEndpoint: config_1.default.llClientInfoEndpoint,
        },
        mongo: {
            db: connectToMongoDb_1.default(),
        },
    },
    events: {
        facade: config_1.default.repoFactory.eventsRepoName,
        redis: {
            client: connectToRedis_1.default(),
            prefix: config_1.default.redis.prefix,
        },
        sentinel: {
            client: connectToSentinel_1.default(),
            prefix: config_1.default.sentinel.prefix,
        }
    },
    models: {
        facade: config_1.default.repoFactory.modelsRepoName,
        memory: {
            state: {
                fullActivities: [],
                statements: [],
            },
        },
        mongo: {
            db: connectToMongoDb_1.default(),
        },
    },
    storage: {
        facade: config_1.default.repoFactory.storageRepoName,
        local: {
            storageDir: config_1.default.storage.local.storageDir,
        },
        s3: {
            awsConfig: config_1.default.storage.s3.awsConfig,
            bucketName: config_1.default.storage.s3.bucketName,
            subFolder: config_1.default.storage.s3.subFolder,
        },
        google: {
            bucketName: config_1.default.storage.google.bucketName,
            keyFileName: config_1.default.storage.google.keyFileName,
            projectId: config_1.default.storage.google.projectId,
            subFolder: config_1.default.storage.google.subFolder,
        }
    },
});
exports.default = repo;
//# sourceMappingURL=index.js.map