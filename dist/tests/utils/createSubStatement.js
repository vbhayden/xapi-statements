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
var createStatement_1 = require("./createStatement");
exports.default = function (overrides) {
    return {
        object: __assign({ objectType: 'SubStatement' }, createStatement_1.default(overrides)),
    };
};
//# sourceMappingURL=createSubStatement.js.map