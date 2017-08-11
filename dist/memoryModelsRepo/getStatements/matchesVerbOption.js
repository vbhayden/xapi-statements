"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchesModel_1 = require("./matchesModel");
var matcher = function (statement, opts) {
    return (opts.verb === undefined ? true :
        statement.verb.id === opts.verb);
};
exports.default = matchesModel_1.default(matcher);
//# sourceMappingURL=matchesVerbOption.js.map