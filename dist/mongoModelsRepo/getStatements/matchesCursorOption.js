"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (opts) {
    if (opts.cursor === undefined) {
        return {};
    }
    return {
        _id: (opts.ascending
            ? { $gt: opts.cursor }
            : { $lt: opts.cursor }),
    };
};
//# sourceMappingURL=matchesCursorOption.js.map