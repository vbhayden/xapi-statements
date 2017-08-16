"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modr = require("../../../utils/modr");
exports.default = function (model, storedTime) {
    return modr.modifySchema({
        timestamp: modr.defaultValue(function () { return storedTime; }),
        stored: modr.overrideValue(storedTime),
    })(model);
};
//# sourceMappingURL=setupPostHashStatement.js.map