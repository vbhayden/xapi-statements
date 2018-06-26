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
var actor_1 = require("./actor");
var verb_1 = require("./verb");
var context_1 = require("./context");
exports.default = (function (statement) {
    return __assign({}, statement, { actor: actor_1.default(statement.actor), verb: verb_1.default(statement.verb) }, (statement.context === undefined ? {} :
        { context: context_1.default(statement.context) }));
});
//# sourceMappingURL=statementBase.js.map