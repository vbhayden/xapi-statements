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
var service_1 = require("jscommons/dist/service");
var storeStatements_1 = require("./storeStatements");
var getClient_1 = require("./getClient");
var getStatement_1 = require("./getStatement");
var getStatements_1 = require("./getStatements");
var getFullActivity_1 = require("./getFullActivity");
exports.default = (function (config) {
    return __assign({ getClient: getClient_1.default(config), storeStatements: storeStatements_1.default(config), getStatement: getStatement_1.default(config), getStatements: getStatements_1.default(config), getFullActivity: getFullActivity_1.default(config) }, service_1.default(config));
});
//# sourceMappingURL=index.js.map