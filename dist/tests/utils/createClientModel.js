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
var scopes_1 = require("../../utils/scopes");
var DEFAULT_AUTHORITY = {
    objectType: 'Agent',
    mbox: 'mailto:authority@example.com',
};
exports.default = function (overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __assign({ _id: 'test_id', title: 'test_title', organisation: 'test_organisation', lrs_id: 'test_lrs_id', api: {
            basic_key: 'test_basic_key',
            basic_secret: 'test_basic_secret',
        }, authority: DEFAULT_AUTHORITY, isTrusted: true, scopes: [scopes_1.ALL] }, overrides);
};
//# sourceMappingURL=createClientModel.js.map