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
exports.default = function (overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __assign({ actor: {
            objectType: 'Agent',
            mbox: 'mailto:test@example.com',
        }, verb: {
            id: 'http://www.example.com/verb',
        }, object: {
            objectType: 'Activity',
            id: 'http://www.example.com/object',
        }, attachments: [], context: {} }, overrides);
};
//# sourceMappingURL=createStatement.js.map