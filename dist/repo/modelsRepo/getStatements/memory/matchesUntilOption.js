"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (statement, opts) {
    return (opts.until === undefined ? true :
        statement.stored <= opts.until);
});
//# sourceMappingURL=matchesUntilOption.js.map