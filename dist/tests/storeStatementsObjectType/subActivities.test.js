"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setupSubStatementTypeTest_1 = require("./utils/setupSubStatementTypeTest");
var activitiesTest_1 = require("./utils/activitiesTest");
describe('store statement with objectType in sub activities', function () {
    var assertTypedStatement = setupSubStatementTypeTest_1.default();
    activitiesTest_1.default(assertTypedStatement);
});
//# sourceMappingURL=subActivities.test.js.map