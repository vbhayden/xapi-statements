"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createClientModel_1 = require("./createClientModel");
var storeAwaitedStatements_1 = require("./storeAwaitedStatements");
exports.default = (function (service) {
    return function (statements, attachments, client) {
        if (attachments === void 0) { attachments = []; }
        if (client === void 0) { client = createClientModel_1.default(); }
        return storeAwaitedStatements_1.default(service)({
            models: statements,
            attachments: attachments,
            client: client
        });
    };
});
//# sourceMappingURL=storeStatementsInService.js.map