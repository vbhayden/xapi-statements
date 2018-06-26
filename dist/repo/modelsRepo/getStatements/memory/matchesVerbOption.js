"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (model, opts) {
    return (opts.verb === undefined ? true :
        model.verbs.indexOf(opts.verb) > -1);
});
//# sourceMappingURL=matchesVerbOption.js.map