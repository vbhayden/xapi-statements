"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingActivity_1 = require("./isMatchingActivity");
var isMatchingContextActivities_1 = require("./isMatchingContextActivities");
var isMatchingRelatedActivity = function (statementKey, activityId) {
    return {
        $or: [
            __assign((_a = {}, _a[statementKey + ".object.objectType"] = 'Activity', _a), isMatchingActivity_1.default(statementKey + ".object", activityId))
        ].concat((statementKey !== 'statement' && statementKey !== 'refs.statement' ? [] : [__assign((_b = {}, _b[statementKey + ".object.objectType"] = 'SubStatement', _b), isMatchingRelatedActivity(statementKey + ".object", activityId))]), [
            isMatchingContextActivities_1.default(statementKey, activityId)
        ])
    };
    var _a, _b;
};
exports.default = isMatchingRelatedActivity;
//# sourceMappingURL=isMatchingRelatedActivity.js.map