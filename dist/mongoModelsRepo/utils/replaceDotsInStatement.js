"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modr = require("../../utils/modr");
var lodash_1 = require("lodash");
var replaceDotsInExtensions = function (searchValue, replaceValue) {
    return modr.modifyType(Object, function (extensions) {
        return lodash_1.mapKeys(extensions, function (_value, key) {
            return key.replace(searchValue, replaceValue);
        });
    });
};
var replaceDotsInParent = function (searchValue, replaceValue) {
    return modr.modifySchema({
        extensions: replaceDotsInExtensions(searchValue, replaceValue),
    });
};
var replaceDotsInActivity = function (searchValue, replaceValue) {
    return modr.modifySchema({
        definition: replaceDotsInParent(searchValue, replaceValue),
    });
};
var replaceDotsInActivities = function (searchValue, replaceValue) {
    return modr.modifyCollection(function () { return replaceDotsInActivity(searchValue, replaceValue); });
};
var replaceDotsInObject = function (searchValue, replaceValue) {
    return function (data) {
        if (data.objectType === 'Activity') {
            return replaceDotsInActivity(searchValue, replaceValue)(data);
        }
        if (data.objectType === 'SubStatement') {
            return replaceDotsInStatement(searchValue, replaceValue)(data);
        }
        return data;
    };
};
var replaceDotsInContext = function (searchValue, replaceValue) {
    return modr.modifySchema({
        contextActivities: modr.modifySchema({
            category: replaceDotsInActivities(searchValue, replaceValue),
            grouping: replaceDotsInActivities(searchValue, replaceValue),
            parent: replaceDotsInActivities(searchValue, replaceValue),
            other: replaceDotsInActivities(searchValue, replaceValue),
        }),
        extensions: replaceDotsInExtensions(searchValue, replaceValue),
    });
};
var replaceDotsInStatement = function (searchValue, replaceValue) {
    return modr.modifySchema({
        object: replaceDotsInObject(searchValue, replaceValue),
        context: replaceDotsInContext(searchValue, replaceValue),
        result: replaceDotsInParent(searchValue, replaceValue)
    });
};
exports.encodeDotsInStatement = replaceDotsInStatement(/\./g, '&46;');
exports.decodeDotsInStatement = replaceDotsInStatement(/&46;/g, '.');
//# sourceMappingURL=replaceDotsInStatement.js.map