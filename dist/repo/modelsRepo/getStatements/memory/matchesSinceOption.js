"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (statement, opts) {
    return (opts.since === undefined ? true :
        statement.stored > opts.since);
});
//# sourceMappingURL=matchesSinceOption.js.map