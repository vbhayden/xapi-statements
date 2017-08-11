"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryOptions_1 = require("../../../errors/QueryOptions");
exports.default = function (opts) {
    var setOpts = Object.keys(opts).filter(function (opt) {
        return opts[opt] !== undefined;
    });
    var hasOpts = setOpts.length !== 0;
    if (hasOpts) {
        throw new QueryOptions_1.default(setOpts);
    }
};
//# sourceMappingURL=checkStatementsOpts.js.map