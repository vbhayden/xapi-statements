"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var agentTest_1 = require("./utils/agentTest");
describe('get ids statements in sub statement instructor', function () {
    agentTest_1.default(function (instructor) {
        return createSubStatement_1.default({ context: { instructor: instructor } });
    });
});
//# sourceMappingURL=subStatementInstructor.test.js.map