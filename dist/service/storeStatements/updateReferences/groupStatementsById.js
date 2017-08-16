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
exports.default = function (statements) {
    return statements.reduce(function (result, statement) {
        return __assign({}, result, (_a = {}, _a[statement.id] = statement, _a));
        var _a;
    }, {});
};
//# sourceMappingURL=groupStatementsById.js.map