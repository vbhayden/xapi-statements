"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("jscommons/dist/winston");
var config_1 = require("./config");
exports.default = winston_1.default({
    console: {
        level: config_1.default.winston.console.level,
    },
    cloudWatch: {
        level: config_1.default.winston.cloudWatch.level,
        enabled: config_1.default.winston.cloudWatch.enabled,
        logGroupName: config_1.default.winston.cloudWatch.logGroupName,
        logStreamName: config_1.default.winston.cloudWatch.logStreamName,
        awsConfig: {
            accessKeyId: (
            /* istanbul ignore next */
            config_1.default.winston.cloudWatch.awsConfig.accessKeyId || ''),
            secretAccessKey: (
            /* istanbul ignore next */
            config_1.default.winston.cloudWatch.awsConfig.secretAccessKey || ''),
            region: (
            /* istanbul ignore next */
            config_1.default.winston.cloudWatch.awsConfig.region || ''),
        },
    }
});
//# sourceMappingURL=logger.js.map