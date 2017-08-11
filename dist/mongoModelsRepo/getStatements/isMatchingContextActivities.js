"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingActivities_1 = require("./isMatchingActivities");
exports.default = function (statementKey, activityId) {
    var contextActivitiesKey = statementKey + ".context.contextActivities";
    return {
        $or: [
            isMatchingActivities_1.default(contextActivitiesKey + ".parent", activityId),
            isMatchingActivities_1.default(contextActivitiesKey + ".grouping", activityId),
            isMatchingActivities_1.default(contextActivitiesKey + ".category", activityId),
            isMatchingActivities_1.default(contextActivitiesKey + ".other", activityId),
        ]
    };
};
//# sourceMappingURL=isMatchingContextActivities.js.map