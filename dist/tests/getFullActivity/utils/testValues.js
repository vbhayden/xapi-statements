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
var createClientModel_1 = require("../../utils/createClientModel");
var scopes_1 = require("../../../utils/scopes");
exports.TEST_CLIENT = createClientModel_1.default();
exports.TEST_FORBIDDEN_CLIENT = createClientModel_1.default({
    scopes: [],
});
exports.TEST_ALLOWED_CLIENT = createClientModel_1.default({
    scopes: [scopes_1.XAPI_PROFILE_ALL],
});
exports.TEST_OUTSIDE_ORG_CLIENT = createClientModel_1.default({
    organisation: '4988f0f00000000000000000',
});
exports.TEST_OUTSIDE_STORE_CLIENT = createClientModel_1.default({
    lrs_id: '4988f0f00000000000000001',
});
exports.TEST_ACTIVITY_ID = 'http://www.example.org/fullActivityTest';
exports.TEST_IMMUTABLE_ACTIVITY_ID = 'http://www.example.org/fullActivityTest/immutable';
exports.TEST_BASE_ACTIVITY = {
    objectType: 'Activity',
    id: exports.TEST_ACTIVITY_ID,
    definition: {
        name: {},
        description: {},
    },
};
exports.TEST_ACTIVITY = __assign({}, exports.TEST_BASE_ACTIVITY, { definition: {
        name: {
            'en-GB': 'test_gb_name',
        },
        description: {
            'en-GB': 'test_gb_description',
        },
    } });
exports.TEST_MERGE_ACTIVITY = __assign({}, exports.TEST_BASE_ACTIVITY, { definition: {
        name: {
            'en-US': 'test_us_name',
        },
        description: {
            'en-US': 'test_us_description',
        },
    } });
exports.TEST_IMMUTABLE_ACTIVITY = __assign({}, exports.TEST_MERGE_ACTIVITY, { id: exports.TEST_IMMUTABLE_ACTIVITY_ID });
exports.TEST_MERGED_ACTIVITY = __assign({}, exports.TEST_BASE_ACTIVITY, { definition: {
        name: __assign({}, exports.TEST_ACTIVITY.definition.name, exports.TEST_MERGE_ACTIVITY.definition.name),
        description: __assign({}, exports.TEST_ACTIVITY.definition.description, exports.TEST_MERGE_ACTIVITY.definition.description)
    } });
//# sourceMappingURL=testValues.js.map