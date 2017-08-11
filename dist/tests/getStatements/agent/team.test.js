"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var groupTest_1 = require("./utils/groupTest");
var assertFilteredStatements_1 = require("../utils/assertFilteredStatements");
var assertFilteredStatementRefs_1 = require("../utils/assertFilteredStatementRefs");
var createActor = function (team) {
    return { context: { team: team } };
};
describe('get statements by agent in team', function () {
    groupTest_1.default(assertFilteredStatements_1.default)(createActor, true);
});
describe('get statements by agent in team with references', function () {
    groupTest_1.default(assertFilteredStatementRefs_1.default)(createActor, true);
});
//# sourceMappingURL=team.test.js.map