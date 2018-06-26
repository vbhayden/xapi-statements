"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var not = function (f) { return function (v) { return !f(v); }; };
exports.default = (function (obj) { return lodash_1.pickBy(obj, not(lodash_1.isUndefined)); });
//# sourceMappingURL=pickDefined.js.map