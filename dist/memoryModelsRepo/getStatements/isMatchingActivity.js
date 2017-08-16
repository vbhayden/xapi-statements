"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (activity, activityId) {
    return (activity.objectType === 'Activity' &&
        activity.id === activityId);
};
//# sourceMappingURL=isMatchingActivity.js.map