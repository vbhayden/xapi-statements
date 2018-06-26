"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var agentFormatTest_1 = require("./agentFormatTest");
exports.default = (function (createActorStatement, createIdsActorStatement) {
    if (createIdsActorStatement === void 0) { createIdsActorStatement = createActorStatement; }
    describe('agent', function () {
        agentFormatTest_1.default(function (ifi) {
            return ifi;
        })(createActorStatement, createIdsActorStatement);
    });
});
//# sourceMappingURL=agentTest.js.map