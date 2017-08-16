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
var statementBase_1 = require("./statementBase");
var subStatementObject_1 = require("./subStatementObject");
exports.default = function (statement) {
    return __assign({}, statement, statementBase_1.default(statement), { object: subStatementObject_1.default(statement.object) });
};
//# sourceMappingURL=subStatement.js.map