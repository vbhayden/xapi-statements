"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var modr = require("../../../utils/modr");
var constants_1 = require("../../../utils/constants");
exports.default = function (model, authority) {
    return modr.modifySchema({
        // Adds the required properties from the model.
        id: modr.defaultValue(uuid_1.v4),
        actor: modr.keepValue,
        verb: modr.keepValue,
        object: modr.keepValue,
        // Adds the optional properties from the model.
        context: modr.keepValue,
        result: modr.keepValue,
        attachments: modr.keepValue,
        timestamp: modr.keepValue,
        // Adds LRS properties.
        authority: modr.overrideValue(authority),
        version: modr.defaultValue(function () { return constants_1.xapiStatementVersion; }),
    })(model);
};
//# sourceMappingURL=setupPreHashStatement.js.map