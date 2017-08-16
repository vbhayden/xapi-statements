"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var setupObjectTypeTest_1 = require("./setupObjectTypeTest");
exports.default = function () {
    var assertTypedStatement = setupObjectTypeTest_1.default();
    var assertTypedSubStatement = function (obj, objectType, objCreator) {
        return assertTypedStatement(obj, objectType, function (data) {
            return createSubStatement_1.default(objCreator(data));
        });
    };
    return assertTypedSubStatement;
};
//# sourceMappingURL=setupSubStatementTypeTest.js.map