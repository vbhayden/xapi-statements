"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activity_1 = require("./activity");
exports.default = function (statementObject, langs) {
    switch (statementObject.objectType) {
        case 'Agent':
        case 'Group':
        case 'StatementRef':
            return statementObject;
        case 'Activity':
        default:
            return activity_1.default(statementObject, langs);
    }
};
//# sourceMappingURL=subStatementObject.js.map