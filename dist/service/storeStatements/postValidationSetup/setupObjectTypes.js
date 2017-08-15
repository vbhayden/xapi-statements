"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modr = require("../../../utils/modr");
var obj = function (defaultObjectType) {
    return modr.modifySchema({
        objectType: modr.defaultValue(function () { return defaultObjectType; }),
    });
};
var members = modr.modifySchema({
    member: modr.modifyCollection(function () { return actor; }),
});
var agent = obj('Agent');
var group = modr.composeModifiers([
    obj('Group'),
    members,
]);
var activity = obj('Activity');
var actor = modr.composeModifiers([agent, group]);
var contextActivities = modr.modifySchema({
    parent: modr.modifyCollection(function () { return activity; }),
    grouping: modr.modifyCollection(function () { return activity; }),
    category: modr.modifyCollection(function () { return activity; }),
    other: modr.modifyCollection(function () { return activity; }),
});
var context = modr.modifySchema({
    team: group,
    instructor: agent,
    contextActivities: contextActivities,
});
var subStatement = modr.modifyType(Object, function (data) {
    return (data.objectType === 'SubStatement' ?
        statementBase(data) :
        data);
});
var object = modr.composeModifiers([activity, actor, subStatement]);
var statementBase = modr.modifySchema({ actor: actor, object: object, context: context });
exports.default = function (model) {
    return statementBase(model);
};
//# sourceMappingURL=setupObjectTypes.js.map