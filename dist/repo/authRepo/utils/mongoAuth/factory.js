"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_1 = require("../../getClient/mongo");
var connectToMongoDb_1 = require("../../../utils/connectToMongoDb");
exports.default = (function (factoryConfig) {
    var facadeConfig = (factoryConfig !== undefined
        ? factoryConfig
        : { db: connectToMongoDb_1.default() });
    return {
        getClient: mongo_1.default(facadeConfig),
    };
});
//# sourceMappingURL=factory.js.map