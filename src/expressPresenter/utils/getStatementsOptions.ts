import { Request } from 'express';
import GetStatementsOptions from '../../service/options/GetStatementsOptions';
import getQueryParam from '../utils/getQueryParam';

export default (req: Request): Partial<GetStatementsOptions> => {
  return {
    agent: getQueryParam(req, 'agent'),
    verb: getQueryParam(req, 'verb'),
    activity: getQueryParam(req, 'activity'),
    registration: getQueryParam(req, 'registration'),
    relatedActivities: getQueryParam(req, 'related_activities'),
    relatedAgents: getQueryParam(req, 'related_agents'),
    since: getQueryParam(req, 'since'),
    until: getQueryParam(req, 'until'),
    limit: getQueryParam(req, 'limit'),
    ascending: getQueryParam(req, 'ascending')
  };
};
