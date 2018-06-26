"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringToStream = require("string-to-stream");
var createSha_1 = require("./createSha");
exports.default = (function (content, contentType) {
    if (contentType === void 0) { contentType = 'text/plain'; }
    return {
        stream: stringToStream(content),
        hash: createSha_1.default(content),
        contentType: contentType,
    };
});
//# sourceMappingURL=createAttachmentModel.js.map