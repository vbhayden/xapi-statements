"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agentTest_1 = require("./agentTest");
var groupTest_1 = require("./groupTest");
exports.default = function (assertFilteredStatements) {
    return function (createActor, relatedAgents) {
        if (relatedAgents === void 0) { relatedAgents = false; }
        agentTest_1.default(assertFilteredStatements)(createActor, relatedAgents);
        groupTest_1.default(assertFilteredStatements)(createActor, relatedAgents);
    };
};
//# sourceMappingURL=actorTest.js.map