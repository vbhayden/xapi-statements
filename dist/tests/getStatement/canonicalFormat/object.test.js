"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canonicalActivityTest_1 = require("./utils/canonicalActivityTest");
var createActivity_1 = require("./utils/createActivity");
describe('get canonical statement object', function () {
    canonicalActivityTest_1.default(function (definition) {
        return {
            object: createActivity_1.default(definition)
        };
    });
});
//# sourceMappingURL=object.test.js.map