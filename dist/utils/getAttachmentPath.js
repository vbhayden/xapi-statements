"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getAttachmentFilename_1 = require("./getAttachmentFilename");
exports.default = function (opts) {
    var filename = getAttachmentFilename_1.default(opts);
    return opts.dir + "/" + filename;
};
//# sourceMappingURL=getAttachmentPath.js.map