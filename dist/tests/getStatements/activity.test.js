"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activityTest_1 = require("./utils/activityTest");
var assertFilteredStatements_1 = require("./utils/assertFilteredStatements");
var assertFilteredStatementRefs_1 = require("./utils/assertFilteredStatementRefs");
describe('get statements by activity', function () {
    activityTest_1.default(assertFilteredStatements_1.default);
});
describe('get statements by activity with statement references', function () {
    activityTest_1.default(assertFilteredStatementRefs_1.default);
});
//# sourceMappingURL=activity.test.js.map