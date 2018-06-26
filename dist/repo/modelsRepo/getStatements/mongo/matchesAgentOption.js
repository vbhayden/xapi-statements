"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getActorIdent_1 = require("../../../../utils/getActorIdent");
var matchesModel_1 = require("./matchesModel");
var matcher = function (agent, opts) {
    var agentIdent = getActorIdent_1.default(agent);
    if (opts.related_agents) {
        return { relatedAgents: agentIdent };
    }
    return { agents: agentIdent };
};
exports.default = matchesModel_1.default(matcher, function (opts) {
    return opts.agent;
});
//# sourceMappingURL=matchesAgentOption.js.map