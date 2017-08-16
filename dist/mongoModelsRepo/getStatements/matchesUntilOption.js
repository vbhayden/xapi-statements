"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (opts) {
    return opts.until === undefined ? {} : {
        stored: { $lte: new Date(opts.until) }
    };
};
//# sourceMappingURL=matchesUntilOption.js.map