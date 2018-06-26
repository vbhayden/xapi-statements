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
var lodash_1 = require("lodash");
var memoryRepo_1 = require("jscommons/dist/memoryRepo");
var memory_1 = require("../../createStatements/memory");
var memory_2 = require("../../getFullActivity/memory");
var memory_3 = require("../../getHashes/memory");
var memory_4 = require("../../getStatement/memory");
var memory_5 = require("../../getStatements/memory");
var memory_6 = require("../../getVoidersByObjectIds/memory");
var memory_7 = require("../../getVoidersByIds/memory");
var memory_8 = require("../../voidStatements/memory");
var memory_9 = require("../../getDownRefId/memory");
var memory_10 = require("../../getUpRefIds/memory");
var memory_11 = require("../../setQueriables/memory");
var memory_12 = require("../../getStatementsByIds/memory");
var memory_13 = require("../../getUpRefsByIds/memory");
var memory_14 = require("../../updateFullActivities/memory");
var memory_15 = require("../../incrementStoreCount/memory");
exports.default = (function (config) {
    if (config === void 0) { config = {}; }
    var factoryState = lodash_1.defaultTo(config.state, {});
    var facadeState = {
        fullActivities: lodash_1.defaultTo(factoryState.fullActivities, []),
        statements: lodash_1.defaultTo(factoryState.statements, []),
    };
    var facadeConfig = { state: facadeState };
    return __assign({}, memoryRepo_1.default(facadeConfig), { createStatements: memory_1.default(facadeConfig), getFullActivity: memory_2.default(facadeConfig), getHashes: memory_3.default(facadeConfig), getStatement: memory_4.default(facadeConfig), getStatements: memory_5.default(facadeConfig), getVoidersByObjectIds: memory_6.default(facadeConfig), getVoidersByIds: memory_7.default(facadeConfig), voidStatements: memory_8.default(facadeConfig), getDownRefId: memory_9.default(facadeConfig), getUpRefIds: memory_10.default(facadeConfig), setQueriables: memory_11.default(facadeConfig), getStatementsByIds: memory_12.default(facadeConfig), getUpRefsByIds: memory_13.default(facadeConfig), updateFullActivities: memory_14.default(facadeConfig), incrementStoreCount: memory_15.default(facadeConfig) });
});
//# sourceMappingURL=factory.js.map