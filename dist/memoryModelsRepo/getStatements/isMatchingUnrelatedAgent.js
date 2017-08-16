"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingAgent_1 = require("./isMatchingAgent");
exports.default = function (statement, filterAgent) {
    return (isMatchingAgent_1.default(statement.actor, filterAgent) ||
        ((statement.object.objectType === 'Agent' ||
            statement.object.objectType === 'Group') &&
            isMatchingAgent_1.default(statement.object, filterAgent)));
};
//# sourceMappingURL=isMatchingUnrelatedAgent.js.map