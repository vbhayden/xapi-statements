import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';
import parseJson from './../../../utils/parseJson';
import * as boolean from 'boolean';

export default (queryParams: any): Partial<GetStatementsOptions> => {
  return {
    agent: queryParams.agent !== undefined ? parseJson(queryParams.agent, ['query', 'agent']) : undefined,
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
