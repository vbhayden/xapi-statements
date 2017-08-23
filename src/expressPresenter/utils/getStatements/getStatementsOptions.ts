import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';
import parseJson from './../../../utils/parseJson';
import * as boolean from 'boolean';

export default (queryParams: any): Partial<GetStatementsOptions> => {
  return {
    agent: queryParams.agent !== undefined ? parseJson(queryParams.agent, ['query', 'agent']) : undefined,
    verb: queryParams.verb,
    activity: queryParams.activity,
    registration: queryParams.registration,
    related_activities:
      queryParams.related_activities !== undefined ? boolean(queryParams.related_activities) : undefined,
    related_agents:
      queryParams.related_agents !== undefined ? boolean(queryParams.related_agents) : undefined,
    since: queryParams.since,
    until: queryParams.until,
    limit: Number(queryParams.limit),
    ascending: boolean(queryParams.ascending),
    cursor: queryParams.cursor,
  };
};
