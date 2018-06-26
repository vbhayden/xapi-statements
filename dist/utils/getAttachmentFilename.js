"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getFileExtension_1 = require("./getFileExtension");
exports.default = (function (opts) {
    var ext = getFileExtension_1.default(opts.contentType);
    return opts.hash + "." + ext;
});
//# sourceMappingURL=getAttachmentFilename.js.map