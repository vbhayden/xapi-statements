"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (model, opts) {
    if (opts.activity === undefined) {
        return true;
    }
    if (opts.related_activities) {
        return model.relatedActivities.indexOf(opts.activity) > -1;
    }
    return model.activities.indexOf(opts.activity) > -1;
});
//# sourceMappingURL=matchesActivityOption.js.map