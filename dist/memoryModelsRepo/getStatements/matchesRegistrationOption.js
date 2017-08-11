"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchesModel_1 = require("./matchesModel");
var matcher = function (statement, opts) {
    return (opts.registration === undefined ? true :
        (statement.context !== undefined &&
            statement.context.registration === opts.registration));
};
exports.default = matchesModel_1.default(matcher);
//# sourceMappingURL=matchesRegistrationOption.js.map