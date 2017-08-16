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
var trimmedChars = "\r\ns";
var headerKeyBoundary = /\:\s*/;
exports.default = function (data) {
    var trimmedHeaders = lodash_1.trimStart(data, trimmedChars);
    if (trimmedHeaders.length === 0) {
        return {};
    }
    var unparsedHeaders = trimmedHeaders.split(/\r?\n/);
    return unparsedHeaders.reduce(function (parsedHeaders, unparsedHeader) {
        var _a = unparsedHeader.split(headerKeyBoundary), headerKey = _a[0], headerValue = _a[1];
        var lowerCaseHeaderKey = headerKey.toLowerCase();
        return __assign({}, parsedHeaders, (_b = {}, _b[lowerCaseHeaderKey] = headerValue, _b));
        var _b;
    }, {});
};
//# sourceMappingURL=parseHeaders.js.map