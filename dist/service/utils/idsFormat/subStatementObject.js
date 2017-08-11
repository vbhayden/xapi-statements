"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actor_1 = require("./actor");
var activity_1 = require("./activity");
exports.default = function (statementObject) {
    switch (statementObject.objectType) {
        case 'Agent':
        case 'Group':
            return actor_1.default(statementObject);
        case 'StatementRef':
            return statementObject;
        case 'Activity':
        default:
            return activity_1.default(statementObject);
    }
};
//# sourceMappingURL=subStatementObject.js.map