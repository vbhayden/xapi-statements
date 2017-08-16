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
var s3Repo_1 = require("jscommons/dist/s3Repo");
var createAttachments_1 = require("./createAttachments");
var getAttachment_1 = require("./getAttachment");
exports.default = function (config) {
    return __assign({ 
        // Attachment functions.
        createAttachments: createAttachments_1.default(config), getAttachment: getAttachment_1.default(config) }, s3Repo_1.default(config));
};
//# sourceMappingURL=index.js.map