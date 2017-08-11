"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setupObjectTypeTest_1 = require("./utils/setupObjectTypeTest");
var membersTest_1 = require("./utils/membersTest");
describe('store statement with objectType in members', function () {
    var assertTypedStatement = setupObjectTypeTest_1.default();
    membersTest_1.default(assertTypedStatement);
});
//# sourceMappingURL=members.test.js.map