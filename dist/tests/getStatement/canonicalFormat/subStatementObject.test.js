"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var canonicalActivityTest_1 = require("./utils/canonicalActivityTest");
var createActivity_1 = require("./utils/createActivity");
describe('get canonical statement sub statement object', function () {
    canonicalActivityTest_1.default(function (definition) {
        return createSubStatement_1.default({
            object: createActivity_1.default(definition)
        });
    });
});
//# sourceMappingURL=subStatementObject.test.js.map