"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseJson_1 = require("./../../../utils/parseJson");
var boolean = require("boolean");
exports.default = function (queryParams) {
    return {
        agent: queryParams.agent !== undefined ? parseJson_1.default(queryParams.agent, ['query', 'agent']) : undefined,
        verb: queryParams.verb,
        activity: queryParams.activity,
        registration: queryParams.registration,
        relatedActivities: boolean(queryParams.related_activities),
        relatedAgents: boolean(queryParams.related_agents),
        since: queryParams.since,
        until: queryParams.until,
        limit: Number(queryParams.limit),
        ascending: boolean(queryParams.ascending),
        cursor: queryParams.cursor,
    };
};
//# sourceMappingURL=getStatementsOptions.js.map