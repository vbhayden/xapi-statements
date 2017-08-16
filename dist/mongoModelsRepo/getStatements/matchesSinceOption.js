"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (opts) {
    return opts.since === undefined ? {} : {
        stored: { $gt: new Date(opts.since) }
    };
};
//# sourceMappingURL=matchesSinceOption.js.map