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
var modr = require("../../utils/modr");
var lodash_1 = require("lodash");
var decodeDotsInExtensions = modr.modifyType(Object, function (extensions) {
    return lodash_1.mapKeys(extensions, function (_value, key) {
        return key.replace(/&46;/g, '.');
    });
});
var decodeDotsInParent = modr.modifySchema({
    extensions: decodeDotsInExtensions
});
var decodeDotsInObject = function (data) {
    if (data.objectType === 'Activity') {
        return __assign({}, data, { definition: decodeDotsInParent(data.definition) });
    }
    if (data.objectType === 'SubStatement') {
        return decodeDotsInStatement(data);
    }
    return data;
};
var decodeDotsInStatement = modr.modifySchema({
    object: decodeDotsInObject,
    context: decodeDotsInParent,
    result: decodeDotsInParent
});
exports.default = decodeDotsInStatement;
//# sourceMappingURL=decodeDotsInStatement.js.map