"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchesModel_1 = require("./matchesModel");
var matcher = function (statementKey, registration) {
    return _a = {},
        _a[statementKey + ".context.registration"] = registration,
        _a;
    var _a;
};
exports.default = matchesModel_1.default(matcher, function (opts) {
    return opts.registration;
});
//# sourceMappingURL=matchesRegistrationOption.js.map