"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mime_types_1 = require("mime-types");
exports.default = function (contentType) {
    try {
        var ext = mime_types_1.extension(contentType);
        return ext;
    }
    catch (err) {
        return 'bin';
    }
};
//# sourceMappingURL=getFileExtension.js.map