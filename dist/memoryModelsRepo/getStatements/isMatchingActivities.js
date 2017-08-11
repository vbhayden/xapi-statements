"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingActivity_1 = require("./isMatchingActivity");
exports.default = function (activities, activityId) {
    if (activities === void 0) { activities = []; }
    return activities.filter(function (activity) {
        return isMatchingActivity_1.default(activity, activityId);
    }).length !== 0;
};
//# sourceMappingURL=isMatchingActivities.js.map