"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var createIdsSubStatement_1 = require("../../utils/createIdsSubStatement");
var groupTest_1 = require("./utils/groupTest");
describe('get ids statements in sub statement team', function () {
    groupTest_1.default(function (team) {
        return createSubStatement_1.default({ context: { team: team } });
    }, function (team) {
        return createIdsSubStatement_1.default({ context: { team: team } });
    });
});
//# sourceMappingURL=subStatementTeam.test.js.map