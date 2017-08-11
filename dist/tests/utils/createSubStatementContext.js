"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createContext_1 = require("./createContext");
var createSubStatement_1 = require("./createSubStatement");
exports.default = function (contextActivities) {
    return createSubStatement_1.default(createContext_1.default(contextActivities));
};
//# sourceMappingURL=createSubStatementContext.js.map