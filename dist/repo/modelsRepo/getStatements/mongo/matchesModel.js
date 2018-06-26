"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (matcher, getter) {
    return function (opts) {
        var opt = getter(opts);
        return opt === undefined ? {} : matcher(opt, opts);
    };
});
//# sourceMappingURL=matchesModel.js.map