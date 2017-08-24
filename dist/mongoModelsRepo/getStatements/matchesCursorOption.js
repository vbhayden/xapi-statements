"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
exports.default = function (opts) {
    if (opts.cursor === undefined) {
        return {};
    }
    return {
        _id: (opts.ascending
            ? { $gt: new mongodb_1.ObjectID(opts.cursor) }
            : { $lt: new mongodb_1.ObjectID(opts.cursor) }),
    };
};
//# sourceMappingURL=matchesCursorOption.js.map