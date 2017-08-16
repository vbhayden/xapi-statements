"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (matcher) {
    return function (model, opts) {
        return (model.voided === false &&
            (matcher(model.statement, opts) ||
                model.refs.filter(function (ref) {
                    return matcher(ref.statement, opts);
                }).length > 0));
    };
};
//# sourceMappingURL=matchesModel.js.map