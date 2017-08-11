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
exports.default = function (verb, langs) {
    return __assign({}, verb, (verb.display === undefined ? {} :
        { display: langMap_1.default(verb.display, langs) }));
};
//# sourceMappingURL=verb.js.map