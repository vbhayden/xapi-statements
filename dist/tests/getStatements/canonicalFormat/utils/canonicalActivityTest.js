"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canonicalTest_1 = require("./canonicalTest");
exports.default = (function (createActivityStatement) {
    describe('name', function () {
        canonicalTest_1.default(function (name) {
            return createActivityStatement({ name: name });
        });
    });
    describe('description', function () {
        canonicalTest_1.default(function (description) {
            return createActivityStatement({ description: description });
        });
    });
});
//# sourceMappingURL=canonicalActivityTest.js.map