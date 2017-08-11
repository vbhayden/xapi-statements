"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setupObjectTypeTest_1 = require("./utils/setupObjectTypeTest");
var activitiesTest_1 = require("./utils/activitiesTest");
describe('store statement with objectType in activities', function () {
    var assertTypedStatement = setupObjectTypeTest_1.default();
    activitiesTest_1.default(assertTypedStatement);
});
//# sourceMappingURL=activities.test.js.map