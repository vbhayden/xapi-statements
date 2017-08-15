"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modr = require("../../utils/modr");
var lodash_1 = require("lodash");
var encodeDotsInExtensions = modr.modifyType(Object, function (extensions) {
    return lodash_1.mapKeys(extensions, function (_value, key) {
        return key.replace(/\./g, '&46;');
    });
});
var encodeDotsInParent = modr.modifySchema({
    extensions: encodeDotsInExtensions
});
var encodeDotsInObject = function (data) {
    if (data.objectType === 'Activity') {
        return modr.modifySchema({
            definition: encodeDotsInParent,
        })(data);
    }
    if (data.objectType === 'SubStatement') {
        return encodeDotsInStatement(data);
    }
    return data;
};
var encodeDotsInStatement = modr.modifySchema({
    object: encodeDotsInObject,
    context: encodeDotsInParent,
    result: encodeDotsInParent
});
exports.default = encodeDotsInStatement;
//# sourceMappingURL=encodeDotsInStatement.js.map