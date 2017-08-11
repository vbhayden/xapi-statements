"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actorTest_1 = require("./utils/actorTest");
var assertFilteredStatements_1 = require("../utils/assertFilteredStatements");
var assertFilteredStatementRefs_1 = require("../utils/assertFilteredStatementRefs");
var createActor = function (object) {
    return { object: object };
};
describe('get statements by agent in object', function () {
    actorTest_1.default(assertFilteredStatements_1.default)(createActor);
});
describe('get statements by agent in object with references', function () {
    actorTest_1.default(assertFilteredStatementRefs_1.default)(createActor);
});
//# sourceMappingURL=object.test.js.map