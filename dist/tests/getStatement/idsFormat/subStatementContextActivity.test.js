"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatementContext_1 = require("../../utils/createSubStatementContext");
var activityFormatTest_1 = require("./utils/activityFormatTest");
describe('get ids statement in sub statement parent contextActivities', function () {
    activityFormatTest_1.default(function (activity) {
        return createSubStatementContext_1.default({ parent: [activity] });
    });
});
describe('get ids statement in sub statement grouping contextActivities', function () {
    activityFormatTest_1.default(function (activity) {
        return createSubStatementContext_1.default({ grouping: [activity] });
    });
});
describe('get ids statement in sub statement category contextActivities', function () {
    activityFormatTest_1.default(function (activity) {
        return createSubStatementContext_1.default({ category: [activity] });
    });
});
describe('get ids statement in sub statement other contextActivities', function () {
    activityFormatTest_1.default(function (activity) {
        return createSubStatementContext_1.default({ other: [activity] });
    });
});
//# sourceMappingURL=subStatementContextActivity.test.js.map