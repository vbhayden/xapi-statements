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
var createSha_1 = require("./createSha");
exports.default = function (content, fileUrl) {
    return __assign({ usageType: 'http://www.example.com', display: {}, contentType: 'text/plain', length: 0, sha2: createSha_1.default(content) }, (fileUrl === undefined ? {} :
        { fileUrl: fileUrl }));
};
//# sourceMappingURL=createAttachment.js.map