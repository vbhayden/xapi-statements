"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verbTest_1 = require("./utils/verbTest");
var assertFilteredStatements_1 = require("./utils/assertFilteredStatements");
var assertFilteredStatementRefs_1 = require("./utils/assertFilteredStatementRefs");
describe('get statements by verb', function () {
    verbTest_1.default(assertFilteredStatements_1.default);
});
describe('get statements by verb with statement references', function () {
    verbTest_1.default(assertFilteredStatementRefs_1.default);
});
//# sourceMappingURL=verb.test.js.map