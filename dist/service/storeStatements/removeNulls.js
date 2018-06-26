"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var removeNulls = function (data) {
    if (lodash_1.isPlainObject(data)) {
        return Object.keys(data).reduce(function (result, key) {
            var value = data[key];
            if (!lodash_1.isNull(value)) {
                result[key] = removeNulls(value);
            }
            return result;
        }, {});
    }
    if (lodash_1.isArray(data)) {
        return data.reduce(function (result, value) {
            if (!lodash_1.isNull(value)) {
                result.push(removeNulls(value));
            }
            return result;
        }, []);
    }
    return data;
};
exports.default = (function (config) {
    return function (data) {
        /* istanbul ignore next */
        if (!config.enableNullRemoval)
            return data;
        return removeNulls(data);
    };
});
//# sourceMappingURL=removeNulls.js.map