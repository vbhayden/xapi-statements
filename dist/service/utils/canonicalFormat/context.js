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
var activity_1 = require("./activity");
var formatContextActivities_1 = require("../formatContextActivities");
var formatContextActivity = function (langs) {
    return function (activity) {
        return activity_1.default(activity, langs);
    };
};
exports.default = function (context, langs) {
    return __assign({}, context, (context.contextActivities === undefined ? {} :
        {
            contextActivities: formatContextActivities_1.default(context.contextActivities, formatContextActivity(langs)),
        }));
};
//# sourceMappingURL=context.js.map