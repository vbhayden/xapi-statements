"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchesModel_1 = require("./matchesModel");
var matcher = function (statementKey, verb) {
    return _a = {},
        _a[statementKey + ".verb.id"] = verb,
        _a;
    var _a;
};
exports.default = matchesModel_1.default(matcher, function (opts) {
    return opts.verb;
});
//# sourceMappingURL=matchesVerbOption.js.map