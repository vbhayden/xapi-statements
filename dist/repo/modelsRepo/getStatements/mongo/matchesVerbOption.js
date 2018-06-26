"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchesModel_1 = require("./matchesModel");
var matcher = function (verb) {
    return {
        verbs: verb,
    };
};
exports.default = matchesModel_1.default(matcher, function (opts) {
    return opts.verb;
});
//# sourceMappingURL=matchesVerbOption.js.map