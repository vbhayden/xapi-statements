"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchesModel_1 = require("./matchesModel");
var matcher = function (registration) {
    return {
        registrations: registration,
    };
};
exports.default = matchesModel_1.default(matcher, function (opts) {
    return opts.registration;
});
//# sourceMappingURL=matchesRegistrationOption.js.map