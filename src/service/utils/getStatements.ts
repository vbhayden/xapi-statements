import { STATEMENT_READ_SCOPES } from '../../utils/scopes';
import StatementModel from '../../models/StatementModel';
import GetStatementsOptions from '../options/GetStatementsOptions';
import Config from '../Config';
import checkScopes from './checkScopes';

export default (config: Config) => {
  return (opts: GetStatementsOptions): Promise<StatementModel[]> => {
    checkScopes(STATEMENT_READ_SCOPES, opts.client.scopes);

    return config.repo.getStatements({
      agent: opts.agent,
      activity: opts.activity,
      verb: opts.verb,
      relatedAgents: opts.relatedAgents,
      relatedActivities: opts.relatedActivities,
      registration: opts.registration,
      since: opts.since,
      until: opts.until,
      ascending: opts.ascending === undefined ? true : opts.ascending,
      limit: opts.limit,
      skip: opts.skip,
      client: opts.client,
    });
  };
};
