"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var createIdsSubStatement_1 = require("../../utils/createIdsSubStatement");
var objectTest_1 = require("./utils/objectTest");
describe('get ids statement in sub statement object', function () {
    objectTest_1.default(function (object) {
        return createSubStatement_1.default({ object: object });
    }, function (object) {
        return createIdsSubStatement_1.default({ object: object });
    });
});
//# sourceMappingURL=subStatementObject.test.js.map