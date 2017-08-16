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
var actor_1 = require("./actor");
var activity_1 = require("./activity");
var formatContextActivities_1 = require("../formatContextActivities");
exports.default = function (context) {
    return __assign({}, context, (context.instructor === undefined ? {} :
        { instructor: actor_1.default(context.instructor) }), (context.team === undefined ? {} :
        { team: actor_1.default(context.team) }), (context.contextActivities === undefined ? {} :
        {
            contextActivities: formatContextActivities_1.default(context.contextActivities, activity_1.default),
        }));
};
//# sourceMappingURL=context.js.map