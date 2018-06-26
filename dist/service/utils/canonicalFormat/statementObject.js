"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subStatement_1 = require("./subStatement");
var subStatementObject_1 = require("./subStatementObject");
exports.default = (function (statementObject, langs) {
    switch (statementObject.objectType) {
        case 'SubStatement':
            return subStatement_1.default(statementObject, langs);
        default:
            return subStatementObject_1.default(statementObject, langs);
    }
});
//# sourceMappingURL=statementObject.js.map