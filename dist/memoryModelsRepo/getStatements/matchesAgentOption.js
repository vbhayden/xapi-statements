"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingRelatedAgent_1 = require("./isMatchingRelatedAgent");
var isMatchingUnrelatedAgent_1 = require("./isMatchingUnrelatedAgent");
var matchesModel_1 = require("./matchesModel");
var matcher = function (statement, opts) {
    return (opts.agent === undefined ? true :
        (opts.relatedAgents === true ?
            isMatchingRelatedAgent_1.default(statement, opts.agent) :
            isMatchingUnrelatedAgent_1.default(statement, opts.agent)));
};
exports.default = matchesModel_1.default(matcher);
//# sourceMappingURL=matchesAgentOption.js.map