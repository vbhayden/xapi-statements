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
exports.default = function (createActorStatement) {
    describe('agent', function () {
        agentFormatTest_1.default(function (ifi) {
            return __assign({ objectType: 'Agent' }, ifi);
        })(createActorStatement);
    });
};
//# sourceMappingURL=agentTest.js.map