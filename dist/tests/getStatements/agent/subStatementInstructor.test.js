"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var agentTest_1 = require("./utils/agentTest");
var assertFilteredStatements_1 = require("../utils/assertFilteredStatements");
var assertFilteredStatementRefs_1 = require("../utils/assertFilteredStatementRefs");
var createActor = function (instructor) {
    return createSubStatement_1.default({ context: { instructor: instructor } });
};
describe('get statements by agent in sub statement instructor', function () {
    agentTest_1.default(assertFilteredStatements_1.default)(createActor, true);
});
describe('get statements by agent in sub statement instructor with references', function () {
    agentTest_1.default(assertFilteredStatementRefs_1.default)(createActor, true);
});
//# sourceMappingURL=subStatementInstructor.test.js.map