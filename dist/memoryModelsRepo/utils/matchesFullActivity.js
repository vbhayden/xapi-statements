"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (opts) {
    return (opts.model.organisationId === opts.organisationId &&
        opts.model.lrsId === opts.lrsId &&
        opts.model.id === opts.activityId);
};
//# sourceMappingURL=matchesFullActivity.js.map