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
var isMatchingUnrelatedAgent_1 = require("./isMatchingUnrelatedAgent");
var isMatchingRelatedActor = function (statementKey, filterAgent) {
    return {
        $or: [
            isMatchingUnrelatedAgent_1.default(statementKey, filterAgent),
            isMatchingAgent_1.default(statementKey + ".context.team", filterAgent),
            isMatchingAgent_1.default(statementKey + ".context.instructor", filterAgent)
        ].concat((statementKey !== 'statement' && statementKey !== 'refs.statement' ? [] : [__assign((_a = {}, _a[statementKey + ".object.objectType"] = 'SubStatement', _a), isMatchingRelatedActor(statementKey + ".object", filterAgent))])),
    };
    var _a;
};
exports.default = function (statementKey, filterAgent) {
    return {
        $or: [
            isMatchingAgent_1.default(statementKey + ".authority", filterAgent),
            isMatchingRelatedActor(statementKey, filterAgent)
        ]
    };
};
//# sourceMappingURL=isMatchingRelatedAgent.js.map