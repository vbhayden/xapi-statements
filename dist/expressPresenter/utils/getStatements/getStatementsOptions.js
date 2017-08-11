"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (queryParams) {
    return {
        agent: queryParams.agent,
        verb: queryParams.verb,
        activity: queryParams.activity,
        registration: queryParams.registration,
        relatedActivities: queryParams.related_activities,
        relatedAgents: queryParams.related_agents,
        since: queryParams.since,
        until: queryParams.until,
        limit: queryParams.limit,
        ascending: queryParams.ascending,
        cursor: queryParams.cursor,
    };
};
//# sourceMappingURL=getStatementsOptions.js.map