"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var getActivityIdsFromObject = function (obj) {
    if (obj.objectType === 'Activity') {
        return [obj.id];
    }
    return [];
};
var getActivitiesFromContextActivities = function (statement, key) {
    var path = ['context', 'contextActivities', key];
    if (lodash_1.has(statement, path)) {
        var activities = lodash_1.get(statement, path);
        return lodash_1.union.apply(void 0, activities.map(getActivityIdsFromObject));
    }
    return [];
};
var getActivitiesFromStatementBase = function (statement) {
    return getActivityIdsFromObject(statement.object).concat(getActivitiesFromContextActivities(statement, 'parent'), getActivitiesFromContextActivities(statement, 'grouping'), getActivitiesFromContextActivities(statement, 'category'), getActivitiesFromContextActivities(statement, 'other'));
};
var getActivitiesFromSubStatement = function (statement) {
    if (statement.object.objectType === 'SubStatement') {
        return getActivitiesFromStatementBase(statement.object);
    }
    return [];
};
exports.getActivitiesFromStatement = function (statement) {
    return getActivityIdsFromObject(statement.object);
};
exports.getRelatedActivitiesFromStatement = function (statement) {
    return lodash_1.union(getActivitiesFromStatementBase(statement).concat(getActivitiesFromSubStatement(statement)));
};
//# sourceMappingURL=getActivitiesFromStatement.js.map