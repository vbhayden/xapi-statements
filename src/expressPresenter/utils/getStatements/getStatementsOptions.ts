import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';

export default (queryParams: any): Partial<GetStatementsOptions> => {
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
