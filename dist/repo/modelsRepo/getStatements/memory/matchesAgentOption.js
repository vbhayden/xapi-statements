"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getActorIdent_1 = require("../../../../utils/getActorIdent");
exports.default = (function (model, opts) {
    if (opts.agent === undefined) {
        return true;
    }
    var agentIdent = getActorIdent_1.default(opts.agent);
    if (opts.related_agents) {
        return model.relatedAgents.indexOf(agentIdent) > -1;
    }
    return model.agents.indexOf(agentIdent) > -1;
});
//# sourceMappingURL=matchesAgentOption.js.map