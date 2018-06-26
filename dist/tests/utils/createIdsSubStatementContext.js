"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createContext_1 = require("./createContext");
var createIdsSubStatement_1 = require("./createIdsSubStatement");
exports.default = (function (contextActivities) {
    return createIdsSubStatement_1.default(createContext_1.default(contextActivities));
});
//# sourceMappingURL=createIdsSubStatementContext.js.map