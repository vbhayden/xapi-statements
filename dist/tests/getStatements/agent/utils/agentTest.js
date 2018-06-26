"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var agentFilterTest_1 = require("./agentFilterTest");
exports.default = (function (assertFilteredStatements) {
    return function (createActor, relatedAgents) {
        describe('agent', function () {
            agentFilterTest_1.default(assertFilteredStatements)(function (actor) {
                return createActor(__assign({}, actor, { objectType: 'Agent' }));
            }, relatedAgents);
        });
    };
});
//# sourceMappingURL=agentTest.js.map