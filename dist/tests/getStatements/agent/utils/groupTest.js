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
exports.default = function (assertFilteredStatements) {
    return function (createActor, related_agents) {
        describe('identified group', function () {
            agentFilterTest_1.default(assertFilteredStatements)(function (actor) {
                return createActor(__assign({}, actor, { objectType: 'Group' }));
            }, related_agents);
        });
        describe('identified group members', function () {
            agentFilterTest_1.default(assertFilteredStatements)(function (actor) {
                return createActor({
                    mbox: 'mailto:test@example.com',
                    objectType: 'Group',
                    member: [__assign({}, actor, { objectType: 'Agent' })]
                });
            }, related_agents);
        });
        describe('anonymous group members', function () {
            agentFilterTest_1.default(assertFilteredStatements)(function (actor) {
                return createActor({
                    objectType: 'Group',
                    member: [__assign({}, actor, { objectType: 'Group' })]
                });
            }, related_agents);
        });
    };
};
//# sourceMappingURL=groupTest.js.map