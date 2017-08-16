"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var registrationTest_1 = require("./utils/registrationTest");
var assertFilteredStatements_1 = require("./utils/assertFilteredStatements");
var assertFilteredStatementRefs_1 = require("./utils/assertFilteredStatementRefs");
describe('get statements by registration', function () {
    registrationTest_1.default(assertFilteredStatements_1.default);
});
describe('get statements by registration with statement references', function () {
    registrationTest_1.default(assertFilteredStatementRefs_1.default);
});
//# sourceMappingURL=registration.test.js.map