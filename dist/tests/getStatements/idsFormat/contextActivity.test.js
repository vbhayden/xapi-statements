"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createContext_1 = require("../../utils/createContext");
var activityFormatTest_1 = require("./utils/activityFormatTest");
describe('get ids statements in parent contextActivities', function () {
    activityFormatTest_1.default(function (activity) {
        return createContext_1.default({ parent: [activity] });
    });
});
describe('get ids statements in grouping contextActivities', function () {
    activityFormatTest_1.default(function (activity) {
        return createContext_1.default({ grouping: [activity] });
    });
});
describe('get ids statements in category contextActivities', function () {
    activityFormatTest_1.default(function (activity) {
        return createContext_1.default({ category: [activity] });
    });
});
describe('get ids statements in other contextActivities', function () {
    activityFormatTest_1.default(function (activity) {
        return createContext_1.default({ other: [activity] });
    });
});
//# sourceMappingURL=contextActivity.test.js.map