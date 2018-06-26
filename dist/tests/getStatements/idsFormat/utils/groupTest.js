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
var agentFormatTest_1 = require("./agentFormatTest");
exports.default = (function (createActorStatement, createIdsActorStatement) {
    if (createIdsActorStatement === void 0) { createIdsActorStatement = createActorStatement; }
    describe('identified group', function () {
        agentFormatTest_1.default(function (ifi) {
            return __assign({ objectType: 'Group' }, ifi);
        })(createActorStatement, createIdsActorStatement);
    });
    describe('identified group members', function () {
        agentFormatTest_1.default(function (ifi) {
            return __assign({}, ifi, { objectType: 'Group' });
        }, function (ifi) {
            return __assign({}, ifi, { objectType: 'Group', member: [{
                        objectType: 'Agent',
                        mbox: 'mailto:test@example.com',
                    }] });
        })(createActorStatement, createIdsActorStatement);
    });
    describe('anonymous group members', function () {
        agentFormatTest_1.default(function (ifi) {
            return {
                objectType: 'Group',
                member: [ifi]
            };
        }, function (ifi) {
            return {
                objectType: 'Group',
                member: [__assign({ objectType: 'Agent' }, ifi)],
            };
        })(createActorStatement, createIdsActorStatement);
    });
});
//# sourceMappingURL=groupTest.js.map