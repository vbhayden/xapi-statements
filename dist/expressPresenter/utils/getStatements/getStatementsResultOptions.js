"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boolean = require("boolean");
exports.default = function (queryParams) {
    return {
        format: queryParams.format,
        attachments: queryParams.attachments !== undefined ? boolean(queryParams.attachments) : undefined
    };
};
//# sourceMappingURL=getStatementsResultOptions.js.map