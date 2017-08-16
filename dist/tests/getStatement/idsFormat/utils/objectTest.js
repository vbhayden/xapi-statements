"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activityFormatTest_1 = require("./activityFormatTest");
var actorTest_1 = require("./actorTest");
exports.default = function (createObjectStatement) {
    describe('activity', function () {
        activityFormatTest_1.default(createObjectStatement);
    });
    actorTest_1.default(createObjectStatement);
};
//# sourceMappingURL=objectTest.js.map