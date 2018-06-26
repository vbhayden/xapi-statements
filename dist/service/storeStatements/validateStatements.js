"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("@learninglocker/xapi-validation/dist/factory");
var rulr = require("rulr");
var validateStatements = rulr.maybe(rulr.restrictToCollection(function () { return factory_1.statement; }));
exports.default = (function (models) {
    validateStatements(models, ['statements']);
});
//# sourceMappingURL=validateStatements.js.map