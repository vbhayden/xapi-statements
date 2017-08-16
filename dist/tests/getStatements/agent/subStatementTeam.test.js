"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var groupTest_1 = require("./utils/groupTest");
var assertFilteredStatements_1 = require("../utils/assertFilteredStatements");
var assertFilteredStatementRefs_1 = require("../utils/assertFilteredStatementRefs");
var createActor = function (team) {
    return createSubStatement_1.default({ context: { team: team } });
};
describe('get statements by agent in sub statement team', function () {
    groupTest_1.default(assertFilteredStatements_1.default)(createActor, true);
});
describe('get statements by agent in sub statement team with references', function () {
    groupTest_1.default(assertFilteredStatementRefs_1.default)(createActor, true);
});
//# sourceMappingURL=subStatementTeam.test.js.map