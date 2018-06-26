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
var getRegistrationsFromStatement_1 = require("../../../service/storeStatements/queriables/getRegistrationsFromStatement");
var REG = '1c86d8e9-f325-404f-b3d9-24c451035585';
var VERB_ID = 'http://example.org/test-verb';
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
    verb: {
        id: 'http://example.org/test-verb'
    },
    object: {
        objectType: 'Activity',
        id: 'http://example.org/activity'
    },
};
var registrationStatement = __assign({}, statementDefaults, { context: {
        registration: REG
    } });
describe('create array of queriable registrations', function () {
    it('should return just the registration from the statement', function () {
        var registrations = getRegistrationsFromStatement_1.default(registrationStatement);
        assert.deepEqual(registrations, [REG]);
    });
    it('should return just an empty array from a statement with no registrations', function () {
        var registrations = getRegistrationsFromStatement_1.default(statementDefaults);
        assert.deepEqual(registrations, []);
    });
});
//# sourceMappingURL=getRegistrationsFromStatement.test.js.map