"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var groupTest_1 = require("./utils/groupTest");
describe('get ids statement in team', function () {
    groupTest_1.default(function (team) {
        return { context: { team: team } };
    });
});
//# sourceMappingURL=team.test.js.map