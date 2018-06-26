"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (model, opts) {
    return (opts.registration === undefined ? true :
        model.registrations.indexOf(opts.registration) > -1);
});
//# sourceMappingURL=matchesRegistrationOption.js.map