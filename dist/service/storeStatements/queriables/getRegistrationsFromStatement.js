"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.default = (function (statement) {
    var registration = lodash_1.get(statement, ['context', 'registration'], undefined);
    if (registration === undefined) {
        return [];
    }
    return [registration];
});
//# sourceMappingURL=getRegistrationsFromStatement.js.map