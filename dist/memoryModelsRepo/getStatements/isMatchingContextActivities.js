"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingActivities_1 = require("./isMatchingActivities");
exports.default = function (statement, activityId) {
    var context = statement.context;
    if (context !== undefined && context.contextActivities !== undefined) {
        var contextActivities = context.contextActivities;
        return (isMatchingActivities_1.default(contextActivities.parent, activityId) ||
            isMatchingActivities_1.default(contextActivities.grouping, activityId) ||
            isMatchingActivities_1.default(contextActivities.category, activityId) ||
            isMatchingActivities_1.default(contextActivities.other, activityId));
    }
    return false;
};
//# sourceMappingURL=isMatchingContextActivities.js.map