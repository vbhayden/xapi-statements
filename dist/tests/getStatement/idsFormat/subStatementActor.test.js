"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createSubStatement_1 = require("../../utils/createSubStatement");
var actorTest_1 = require("./utils/actorTest");
describe('get ids statement in sub statement actor', function () {
    actorTest_1.default(function (actor) {
        return createSubStatement_1.default({ actor: actor });
    });
});
//# sourceMappingURL=subStatementActor.test.js.map