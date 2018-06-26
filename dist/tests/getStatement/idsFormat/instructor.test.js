"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agentTest_1 = require("./utils/agentTest");
describe('get ids statement in instructor', function () {
    agentTest_1.default(function (instructor) {
        return { context: { instructor: instructor } };
    });
});
//# sourceMappingURL=instructor.test.js.map