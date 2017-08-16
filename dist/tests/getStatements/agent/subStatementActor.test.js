"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var actorTest_1 = require("./utils/actorTest");
var assertFilteredStatements_1 = require("../utils/assertFilteredStatements");
var assertFilteredStatementRefs_1 = require("../utils/assertFilteredStatementRefs");
var createActor = function (actor) {
    return createSubStatement_1.default({ actor: actor });
};
describe('get statements by agent in sub statement actor', function () {
    actorTest_1.default(assertFilteredStatements_1.default)(createActor, true);
});
describe('get statements by agent in sub statement actor with references', function () {
    actorTest_1.default(assertFilteredStatementRefs_1.default)(createActor, true);
});
//# sourceMappingURL=subStatementActor.test.js.map