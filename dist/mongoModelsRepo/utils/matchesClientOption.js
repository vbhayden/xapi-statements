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
var lodash_1 = require("lodash");
var scopes = require("../../utils/scopes");
var READ_ALL_SCOPES = [
    scopes.ALL,
    scopes.ALL_READ,
    scopes.XAPI_ALL,
    scopes.XAPI_READ,
    scopes.XAPI_STATEMENTS_READ,
];
exports.default = function (client) {
    var canOnlyReadMine = (lodash_1.intersection(READ_ALL_SCOPES, client.scopes).length === 0 &&
        lodash_1.includes(client.scopes, scopes.XAPI_STATEMENTS_READ_MINE));
    return __assign({ lrs_id: client.lrs_id }, (canOnlyReadMine
        ? { client: client._id }
        : {}));
};
//# sourceMappingURL=matchesClientOption.js.map