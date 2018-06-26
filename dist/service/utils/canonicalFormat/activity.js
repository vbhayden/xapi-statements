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
var langMap_1 = require("./langMap");
var formatDefinition = function (definition, langs) {
    return __assign({}, definition, (definition.name === undefined ? {} :
        { name: langMap_1.default(definition.name, langs) }), (definition.description === undefined ? {} :
        { description: langMap_1.default(definition.description, langs) }));
};
exports.default = (function (activity, langs) {
    return __assign({}, activity, (activity.definition === undefined ? {} :
        { definition: formatDefinition(activity.definition, langs) }));
});
//# sourceMappingURL=activity.js.map