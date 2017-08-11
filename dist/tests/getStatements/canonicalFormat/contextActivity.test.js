"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createContext_1 = require("../../utils/createContext");
var canonicalActivityTest_1 = require("./utils/canonicalActivityTest");
var createActivity_1 = require("./utils/createActivity");
var canonicalContextActivityTest = function (contextActivityType) {
    describe("get canonical statements " + contextActivityType, function () {
        canonicalActivityTest_1.default(function (definition) {
            return createContext_1.default((_a = {},
                _a[contextActivityType] = [createActivity_1.default(definition)],
                _a));
            var _a;
        });
    });
};
canonicalContextActivityTest('parent');
canonicalContextActivityTest('grouping');
canonicalContextActivityTest('category');
canonicalContextActivityTest('other');
//# sourceMappingURL=contextActivity.test.js.map