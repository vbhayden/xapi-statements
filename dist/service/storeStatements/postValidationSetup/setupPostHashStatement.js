"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modr = require("../../../utils/modr");
var constants_1 = require("../../../utils/constants");
exports.default = (function (model, storedTime, authority) {
    return modr.modifySchema({
        timestamp: modr.defaultValue(function () { return storedTime; }),
        stored: modr.overrideValue(storedTime),
        // Adds LRS properties.
        authority: modr.overrideValue(authority),
        version: modr.defaultValue(function () { return constants_1.xapiStatementVersion; }),
    })(model);
});
//# sourceMappingURL=setupPostHashStatement.js.map