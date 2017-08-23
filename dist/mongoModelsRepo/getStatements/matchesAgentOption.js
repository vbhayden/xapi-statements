"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingRelatedAgent_1 = require("./isMatchingRelatedAgent");
var isMatchingUnrelatedAgent_1 = require("./isMatchingUnrelatedAgent");
var matchesModel_1 = require("./matchesModel");
var matcher = function (statementKey, agent, opts) {
    return (opts.related_agents === true ?
        isMatchingRelatedAgent_1.default(statementKey, agent) :
        isMatchingUnrelatedAgent_1.default(statementKey, agent));
};
exports.default = matchesModel_1.default(matcher, function (opts) {
    return opts.agent;
});
//# sourceMappingURL=matchesAgentOption.js.map