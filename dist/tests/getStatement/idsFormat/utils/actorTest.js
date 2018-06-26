"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agentTest_1 = require("./agentTest");
var groupTest_1 = require("./groupTest");
exports.default = (function (createActorStatement, createIdsActorStatement) {
    if (createIdsActorStatement === void 0) { createIdsActorStatement = createActorStatement; }
    agentTest_1.default(createActorStatement, createIdsActorStatement);
    groupTest_1.default(createActorStatement, createIdsActorStatement);
});
//# sourceMappingURL=actorTest.js.map