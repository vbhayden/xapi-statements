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
var agentFilterTest_1 = require("./utils/agentFilterTest");
var agentTest_1 = require("./utils/agentTest");
var assertFilteredStatements_1 = require("../utils/assertFilteredStatements");
describe('get statements by agent in authority', function () {
    agentTest_1.default(assertFilteredStatements_1.default)(function (authority) {
        return { authority: authority };
    }, true);
    describe('identified group members', function () {
        agentFilterTest_1.default(assertFilteredStatements_1.default)(function (actor) {
            return {
                authority: {
                    mbox: 'mailto:test@example.com',
                    objectType: 'Group',
                    member: [__assign({}, actor, { objectType: 'Agent' }), {
                            mbox: 'mailto:test@example.com',
                            objectType: 'Agent',
                        }],
                },
            };
        }, true);
    });
    describe('anonymous group members', function () {
        agentFilterTest_1.default(assertFilteredStatements_1.default)(function (actor) {
            return {
                authority: {
                    objectType: 'Group',
                    member: [__assign({}, actor, { objectType: 'Agent' }), {
                            mbox: 'mailto:test@example.com',
                            objectType: 'Agent',
                        }],
                },
            };
        }, true);
    });
});
//# sourceMappingURL=authority.test.js.map