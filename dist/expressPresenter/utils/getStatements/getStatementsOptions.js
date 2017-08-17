"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getNumberOption_1 = require("jscommons/dist/config/getNumberOption");
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
        limit: getNumberOption_1.default(queryParams.limit, 0),
        ascending: queryParams.ascending,
        cursor: queryParams.cursor,
    };
};
//# sourceMappingURL=getStatementsOptions.js.map