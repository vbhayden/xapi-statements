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
var voidVerbId_1 = require("../../utils/voidVerbId");
var createStatement_1 = require("../utils/createStatement");
exports.default = (function (objectId, id) {
    return createStatement_1.default(__assign({}, (id === undefined ? {} :
        { id: id }), { verb: {
            id: voidVerbId_1.default,
        }, object: {
            objectType: 'StatementRef',
            id: objectId,
        } }));
});
//# sourceMappingURL=createVoidingStatement.js.map