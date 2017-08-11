"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setupSubStatementTypeTest_1 = require("./utils/setupSubStatementTypeTest");
var membersTest_1 = require("./utils/membersTest");
describe('store statement with objectType in sub members', function () {
    var assertTypedStatement = setupSubStatementTypeTest_1.default();
    membersTest_1.default(assertTypedStatement);
});
//# sourceMappingURL=subMembers.test.js.map