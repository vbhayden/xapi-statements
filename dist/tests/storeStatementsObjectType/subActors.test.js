"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setupSubStatementTypeTest_1 = require("./utils/setupSubStatementTypeTest");
var actorsTest_1 = require("./utils/actorsTest");
describe('store statement with objectType in sub actors', function () {
    var assertTypedStatement = setupSubStatementTypeTest_1.default();
    actorsTest_1.default(assertTypedStatement);
});
//# sourceMappingURL=subActors.test.js.map