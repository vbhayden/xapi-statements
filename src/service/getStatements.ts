import { STATEMENT_READ_SCOPES } from '../utils/scopes';
import GetStatementsOptions from '../serviceFactory/options/GetStatementsOptions';
import StatementsResult from '../models/StatementsResult';
import checkScopes from './utils/checkScopes';
import getStatementsResult from './utils/getStatementsResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<StatementsResult> => {
    checkScopes(STATEMENT_READ_SCOPES, opts.client.scopes);

    const limit = opts.limit === undefined || opts.limit === 0 ? 100 : opts.limit;
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
      limit: limit + 1,
      skip: opts.skip,
      client: opts.client,
      cursor: opts.cursor,
    });

    const hasMoreModels = models.length > limit;
    const cursor = hasMoreModels ? models[models.length - 2]._id : undefined;
    const resultModels = hasMoreModels ? models.slice(0, models.length - 1) : models;
    const result = await getStatementsResult(config, opts, resultModels);

    return {
      ...result,
      cursor
    };
  };
};
