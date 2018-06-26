"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnknownParams_1 = require("../../errors/UnknownParams");
var lodash_1 = require("lodash");
exports.default = (function (queryParams, knownParams) {
    var givenParams = Object.keys(queryParams);
    var unknownParams = lodash_1.difference(givenParams, knownParams);
    if (unknownParams.length > 0) {
        throw new UnknownParams_1.default(unknownParams);
    }
});
//# sourceMappingURL=checkUnknownParams.js.map