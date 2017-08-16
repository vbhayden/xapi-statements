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
var isMatchingRelatedActivity_1 = require("./isMatchingRelatedActivity");
var isMatchingActivity_1 = require("./isMatchingActivity");
var matchesModel_1 = require("./matchesModel");
var matcher = function (statementKey, activity, opts) {
    return (opts.relatedActivities === true ?
        isMatchingRelatedActivity_1.default(statementKey, activity) : __assign((_a = {}, _a[statementKey + ".object.objectType"] = 'Activity', _a), isMatchingActivity_1.default(statementKey + ".object", activity)));
    var _a;
};
exports.default = matchesModel_1.default(matcher, function (opts) {
    return opts.activity;
});
//# sourceMappingURL=matchesActivityOption.js.map