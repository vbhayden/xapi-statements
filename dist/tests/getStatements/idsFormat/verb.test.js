"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var verbFormatTest_1 = require("./utils/verbFormatTest");
describe('get ids statements in verb', function () {
    verbFormatTest_1.default(function (verb) {
        return { verb: verb };
    });
});
describe('get ids statements in sub statement verb', function () {
    verbFormatTest_1.default(function (verb) {
        return createSubStatement_1.default({ verb: verb });
    });
});
//# sourceMappingURL=verb.test.js.map