"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agentTest_1 = require("./agentTest");
var groupTest_1 = require("./groupTest");
exports.default = function (createActorStatement) {
    agentTest_1.default(createActorStatement);
    groupTest_1.default(createActorStatement);
};
//# sourceMappingURL=actorTest.js.map