"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingActivity_1 = require("./isMatchingActivity");
var isMatchingContextActivities_1 = require("./isMatchingContextActivities");
var isMatchingRelatedActivity = function (statement, activityId) {
    return ((statement.object.objectType === 'Activity' &&
        isMatchingActivity_1.default(statement.object, activityId)) ||
        (statement.object.objectType === 'SubStatement' &&
            isMatchingRelatedActivity(statement.object, activityId)) ||
        isMatchingContextActivities_1.default(statement, activityId));
};
exports.default = isMatchingRelatedActivity;
//# sourceMappingURL=isMatchingRelatedActivity.js.map