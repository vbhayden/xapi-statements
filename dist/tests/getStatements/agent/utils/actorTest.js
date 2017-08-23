"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agentTest_1 = require("./agentTest");
var groupTest_1 = require("./groupTest");
exports.default = function (assertFilteredStatements) {
    return function (createActor, related_agents) {
        if (related_agents === void 0) { related_agents = false; }
        agentTest_1.default(assertFilteredStatements)(createActor, related_agents);
        groupTest_1.default(assertFilteredStatements)(createActor, related_agents);
    };
};
//# sourceMappingURL=actorTest.js.map