"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activityFormatTest_1 = require("./activityFormatTest");
var actorTest_1 = require("./actorTest");
exports.default = (function (createObjectStatement, createIdsObjectStatement) {
    if (createIdsObjectStatement === void 0) { createIdsObjectStatement = createObjectStatement; }
    describe('activity', function () {
        activityFormatTest_1.default(createObjectStatement, createIdsObjectStatement);
    });
    actorTest_1.default(createObjectStatement, createIdsObjectStatement);
});
//# sourceMappingURL=objectTest.js.map