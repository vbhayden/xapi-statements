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
exports.default = function (opts) {
    if (opts.results.cursor === undefined) {
        return undefined;
    }
    var moreLinkOpts = __assign({}, opts.statementsOpts, opts.resultOpts, { cursor: opts.results.cursor });
    var moreLinkParams = lodash_1.map(moreLinkOpts, function (value, key) {
        return value === undefined ? '' : key + "=" + value;
    }).filter(function (param) {
        return param !== '';
    }).join('&');
    return "/statements?" + moreLinkParams;
};
//# sourceMappingURL=getMoreLink.js.map