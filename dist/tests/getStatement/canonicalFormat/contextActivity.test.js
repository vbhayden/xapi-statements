"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createContext_1 = require("../../utils/createContext");
var canonicalActivityTest_1 = require("./utils/canonicalActivityTest");
var createActivity_1 = require("./utils/createActivity");
var canonicalContextActivityTest = function (contextActivityType) {
    describe("get canonical statement " + contextActivityType, function () {
        canonicalActivityTest_1.default(function (definition) {
            var _a;
            return createContext_1.default((_a = {},
                _a[contextActivityType] = [createActivity_1.default(definition)],
                _a));
        });
    });
};
canonicalContextActivityTest('parent');
canonicalContextActivityTest('grouping');
canonicalContextActivityTest('category');
canonicalContextActivityTest('other');
//# sourceMappingURL=contextActivity.test.js.map