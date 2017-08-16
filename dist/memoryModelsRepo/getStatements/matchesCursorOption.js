"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (model, opts) {
    if (opts.cursor === undefined) {
        return true;
    }
    return opts.ascending ? model._id > opts.cursor : model._id < opts.cursor;
};
//# sourceMappingURL=matchesCursorOption.js.map