import { STATEMENT_READ_SCOPES } from '../utils/scopes';
import StatementsResult from '../models/StatementsResult';
import GetStatementsOptions from './options/GetStatementsOptions';
import checkScopes from './utils/checkScopes';
import getStatementsResult from './utils/getStatementsResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<StatementsResult> => {
    checkScopes(STATEMENT_READ_SCOPES, opts.client.scopes);

    const models = await config.repo.getStatements({
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
      client: opts.client
    });

    return getStatementsResult(config, opts, models);
  };
};
