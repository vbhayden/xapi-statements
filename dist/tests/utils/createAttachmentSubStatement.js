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
var createSubStatement_1 = require("./createSubStatement");
exports.default = function (attachments, id) {
    return createStatement_1.default(__assign({}, (id === undefined ? {} :
        { id: id }), createSubStatement_1.default({
        attachments: attachments,
    })));
};
//# sourceMappingURL=createAttachmentSubStatement.js.map