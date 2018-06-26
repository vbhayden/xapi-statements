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
var assert = require("assert");
var getAgentsFromStatement_1 = require("../../../service/storeStatements/queriables/getAgentsFromStatement");
var ACTIVITY_ID = 'http://example.org/test-activity';
var activity = {
    objectType: 'Activity',
    id: ACTIVITY_ID
};
var statementDefaults = {
    id: 'testvalue',
    authority: {
        objectType: 'Agent',
        mbox: 'mailto:authority@test.com'
    },
    stored: 'testvalue',
    timestamp: 'testvalue',
    version: 'testvalue',
    actor: {
        objectType: 'Agent',
        mbox: 'mailto:actor@test.com'
    },
    object: activity,
    verb: {
        id: 'http://example.org/verb'
    }
};
var agentObjectModel = __assign({}, statementDefaults, { object: {
        objectType: 'Agent',
        mbox: 'mailto:objectagent@test.com'
    } });
var activityObjectModel = __assign({}, statementDefaults, { object: activity, context: {
        team: {
            objectType: 'Group',
            mbox: 'mailto:team@test.com',
            member: [
                { objectType: 'Agent', mbox: 'mailto:teammember@test.com' }
            ]
        },
        instructor: {
            objectType: 'Agent',
            mbox: 'mailto:instructor@test.com',
        }
    } });
var subStatementObjectModel = __assign({}, statementDefaults, { object: {
        objectType: 'SubStatement',
        actor: {
            objectType: 'Agent',
            mbox: 'mailto:ssactor@test.com'
        },
        verb: {
            id: 'http://example.org/verb'
        },
        object: activity,
        context: activityObjectModel.context
    }, context: {
        team: {
            objectType: 'Group',
            mbox: 'mailto:ssteam@test.com',
            member: [
                { objectType: 'Agent', mbox: 'mailto:ssteammember@test.com' }
            ]
        },
        instructor: {
            objectType: 'Agent',
            mbox: 'mailto:ssinstructor@test.com',
        }
    } });
describe('create array of queriable agents', function () {
    it('should return the non related agents', function () {
        var idents = getAgentsFromStatement_1.getAgentsFromStatement(agentObjectModel);
        var agentObj = agentObjectModel.object;
        assert.deepEqual(idents, [
            agentObjectModel.actor.mbox,
            agentObj.mbox
        ]);
    });
    it('should return the related activities', function () {
        var idents = getAgentsFromStatement_1.getRelatedAgentsFromStatement(activityObjectModel);
        var context = activityObjectModel.context;
        var team = context.team;
        var member = team.member;
        var instructor = context.instructor;
        assert.deepEqual(idents, [
            activityObjectModel.actor.mbox,
            team.mbox
        ].concat(member.map(function (m) { return m.mbox; }), [
            instructor.mbox,
            activityObjectModel.authority.mbox,
        ]));
    });
    it('should return the related activities with a substatement', function () {
        var idents = getAgentsFromStatement_1.getRelatedAgentsFromStatement(subStatementObjectModel);
        var context = subStatementObjectModel.context;
        var team = context.team;
        var member = team.member;
        var instructor = context.instructor;
        var ssobject = subStatementObjectModel.object;
        var sscontext = ssobject.context;
        var ssteam = sscontext.team;
        var ssmember = ssteam.member;
        var ssinstructor = sscontext.instructor;
        assert.deepEqual(idents, [
            subStatementObjectModel.actor.mbox,
            team.mbox
        ].concat(member.map(function (m) { return m.mbox; }), [
            instructor.mbox,
            subStatementObjectModel.authority.mbox,
            ssobject.actor.mbox,
            ssteam.mbox
        ], ssmember.map(function (m) { return m.mbox; }), [
            ssinstructor.mbox,
        ]));
    });
});
//# sourceMappingURL=getAgentsFromStatement.test.js.map