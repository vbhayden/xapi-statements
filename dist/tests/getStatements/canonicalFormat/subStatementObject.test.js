"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var canonicalObjectTest_1 = require("./utils/canonicalObjectTest");
describe('get canonical statements sub statement object', function () {
    canonicalObjectTest_1.default(function (object) {
        return createSubStatement_1.default({ object: object });
    });
});
//# sourceMappingURL=subStatementObject.test.js.map