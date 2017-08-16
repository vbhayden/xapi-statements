"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (matcher, getter) {
    return function (opts) {
        var opt = getter(opts);
        return opt === undefined ? {} : {
            $or: [
                matcher('statement', opt, opts),
                matcher('refs.statement', opt, opts),
            ],
        };
    };
};
//# sourceMappingURL=matchesModel.js.map