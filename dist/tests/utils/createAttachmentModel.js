"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringToStream = require("string-to-stream");
var createSha_1 = require("./createSha");
exports.default = function (content) {
    return {
        stream: stringToStream(content),
        hash: createSha_1.default(content),
    };
};
//# sourceMappingURL=createAttachmentModel.js.map