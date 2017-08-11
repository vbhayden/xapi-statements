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
var isMatchingAgent_1 = require("./isMatchingAgent");
exports.default = function (statementKey, filterAgent) {
    return {
        $or: [
            isMatchingAgent_1.default(statementKey + ".actor", filterAgent),
            __assign((_a = {}, _a[statementKey + ".object.objectType"] = { $in: ['Agent', 'Group'] }, _a), isMatchingAgent_1.default(statementKey + ".object", filterAgent))
        ]
    };
    var _a;
};
//# sourceMappingURL=isMatchingUnrelatedAgent.js.map