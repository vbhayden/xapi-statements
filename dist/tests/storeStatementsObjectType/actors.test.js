"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setupObjectTypeTest_1 = require("./utils/setupObjectTypeTest");
var actorsTest_1 = require("./utils/actorsTest");
describe('store statement with objectType in actors', function () {
    var assertTypedStatement = setupObjectTypeTest_1.default();
    actorsTest_1.default(assertTypedStatement);
});
//# sourceMappingURL=actors.test.js.map