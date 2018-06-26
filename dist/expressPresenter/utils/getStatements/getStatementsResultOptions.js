"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var boolean = require("boolean");
exports.default = (function (queryParams, client) {
    return {
        format: queryParams.format,
        attachments: queryParams.attachments !== undefined ? boolean(queryParams.attachments) : undefined,
        client: client
    };
});
//# sourceMappingURL=getStatementsResultOptions.js.map