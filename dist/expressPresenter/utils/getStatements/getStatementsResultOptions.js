"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boolean = require("boolean");
exports.default = function (queryParams) {
    return {
        format: queryParams.format,
        attachments: boolean(queryParams.attachments)
    };
};
//# sourceMappingURL=getStatementsResultOptions.js.map