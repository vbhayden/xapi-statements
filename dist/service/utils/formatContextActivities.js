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
exports.default = function (contextActivities, formatter) {
    return __assign({}, (contextActivities.parent === undefined ? {} :
        { parent: contextActivities.parent.map(formatter) }), (contextActivities.grouping === undefined ? {} :
        { grouping: contextActivities.grouping.map(formatter) }), (contextActivities.category === undefined ? {} :
        { category: contextActivities.category.map(formatter) }), (contextActivities.other === undefined ? {} :
        { other: contextActivities.other.map(formatter) }));
};
//# sourceMappingURL=formatContextActivities.js.map