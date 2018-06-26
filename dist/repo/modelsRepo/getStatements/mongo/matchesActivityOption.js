"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchesModel_1 = require("./matchesModel");
var matcher = function (activity, opts) {
    if (opts.related_activities) {
        return { relatedActivities: activity };
    }
    return { activities: activity };
};
exports.default = matchesModel_1.default(matcher, function (opts) {
    return opts.activity;
});
//# sourceMappingURL=matchesActivityOption.js.map