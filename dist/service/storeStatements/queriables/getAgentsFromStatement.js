"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var getActorIdent_1 = require("../../../utils/getActorIdent");
exports.getActorIdents = function (actor) {
    try {
        return [getActorIdent_1.default(actor)];
    }
    catch (err) {
        return [];
    }
};
var getGroupMemberIdents = function (group) {
    if (group.member === undefined) {
        return [];
    }
    return lodash_1.union.apply(void 0, group.member.map(getAgentsFromObject));
};
exports.getGroupIdents = function (group) {
    var idents = exports.getActorIdents(group);
    var members = getGroupMemberIdents(group);
    return idents.concat(members);
};
var getAgentsFromObject = function (obj) {
    switch (obj.objectType) {
        case 'Agent':
            return exports.getActorIdents(obj);
        case 'Group':
            return exports.getGroupIdents(obj);
        default:
            return [];
    }
};
var getAgentsFromTeam = function (statement) {
    var path = ['context', 'team'];
    if (lodash_1.has(statement, path)) {
        var team = lodash_1.get(statement, path);
        return getAgentsFromObject(team);
    }
    return [];
};
var getAgentsFromInstructor = function (statement) {
    var path = ['context', 'instructor'];
    if (lodash_1.has(statement, path)) {
        var team = lodash_1.get(statement, path);
        return getAgentsFromObject(team);
    }
    return [];
};
var getRelatedAgentsFromStatementBase = function (statement) {
    return exports.getAgentsFromStatement(statement).concat(getAgentsFromTeam(statement), getAgentsFromInstructor(statement));
};
var getAgentsFromSubStatement = function (statement) {
    if (statement.object.objectType === 'SubStatement') {
        return getRelatedAgentsFromStatementBase(statement.object);
    }
    return [];
};
exports.getAgentsFromStatement = function (statement) {
    return lodash_1.union(getAgentsFromObject(statement.actor).concat(getAgentsFromObject(statement.object)));
};
exports.getRelatedAgentsFromStatement = function (statement) {
    return lodash_1.union(getRelatedAgentsFromStatementBase(statement).concat(getAgentsFromObject(statement.authority), getAgentsFromSubStatement(statement)));
};
//# sourceMappingURL=getAgentsFromStatement.js.map