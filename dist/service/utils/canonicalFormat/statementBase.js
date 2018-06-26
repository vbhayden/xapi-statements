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
var verb_1 = require("./verb");
var context_1 = require("./context");
exports.default = (function (statement, langs) {
    return __assign({}, statement, { verb: verb_1.default(statement.verb, langs) }, (statement.context === undefined ? {} :
        { context: context_1.default(statement.context, langs) }));
});
//# sourceMappingURL=statementBase.js.map