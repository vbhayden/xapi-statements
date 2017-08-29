"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var memoryRepo_1 = require("jscommons/dist/memoryRepo");
var createStatements_1 = require("./createStatements");
var getFullActivity_1 = require("./getFullActivity");
var getHashes_1 = require("./getHashes");
var getStatement_1 = require("./getStatement");
var getStatements_1 = require("./getStatements");
var getVoidersByObjectIds_1 = require("./getVoidersByObjectIds");
var getVoidersByIds_1 = require("./getVoidersByIds");
var voidStatements_1 = require("./voidStatements");
var getDownRefId_1 = require("./getDownRefId");
var getUpRefIds_1 = require("./getUpRefIds");
var setRefs_1 = require("./setRefs");
var getStatementsByIds_1 = require("./getStatementsByIds");
var getUpRefsByIds_1 = require("./getUpRefsByIds");
var updateFullActivities_1 = require("./updateFullActivities");
exports.default = function (config) {
    return __assign({ createStatements: createStatements_1.default(config), getFullActivity: getFullActivity_1.default(config), getHashes: getHashes_1.default(config), getStatement: getStatement_1.default(config), getStatements: getStatements_1.default(config), getVoidersByObjectIds: getVoidersByObjectIds_1.default(config), getVoidersByIds: getVoidersByIds_1.default(config), voidStatements: voidStatements_1.default(config), getDownRefId: getDownRefId_1.default(config), getUpRefIds: getUpRefIds_1.default(config), setRefs: setRefs_1.default(config), getStatementsByIds: getStatementsByIds_1.default(config), getUpRefsByIds: getUpRefsByIds_1.default(config), updateFullActivities: updateFullActivities_1.default(config) }, memoryRepo_1.default(config));
};
//# sourceMappingURL=index.js.map