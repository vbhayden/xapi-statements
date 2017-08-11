"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subStatement_1 = require("./subStatement");
var subStatementObject_1 = require("./subStatementObject");
exports.default = function (statementObject) {
    switch (statementObject.objectType) {
        case 'SubStatement':
            return subStatement_1.default(statementObject);
        default:
            return subStatementObject_1.default(statementObject);
    }
};
//# sourceMappingURL=statementObject.js.map