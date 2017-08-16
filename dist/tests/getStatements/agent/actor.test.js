"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actorTest_1 = require("./utils/actorTest");
var assertFilteredStatements_1 = require("../utils/assertFilteredStatements");
var assertFilteredStatementRefs_1 = require("../utils/assertFilteredStatementRefs");
var createActor = function (actor) {
    return { actor: actor };
};
describe('get statements by agent in actor', function () {
    actorTest_1.default(assertFilteredStatements_1.default)(createActor);
});
describe('get statements by agent in actor with references', function () {
    actorTest_1.default(assertFilteredStatementRefs_1.default)(createActor);
});
//# sourceMappingURL=actor.test.js.map