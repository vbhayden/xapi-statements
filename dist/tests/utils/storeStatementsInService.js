"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createClientModel_1 = require("./createClientModel");
var storeAwaitedStatements_1 = require("./storeAwaitedStatements");
exports.default = function (service) {
    return function (statements, attachments) {
        if (attachments === void 0) { attachments = []; }
        return storeAwaitedStatements_1.default(service)({
            models: statements,
            attachments: attachments,
            client: createClientModel_1.default(),
        });
    };
};
//# sourceMappingURL=storeStatementsInService.js.map