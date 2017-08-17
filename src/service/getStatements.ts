import checkScopes from 'jscommons/dist/service/utils/checkScopes';
import { STATEMENT_READ_SCOPES } from '../utils/scopes';
import GetStatementsOptions from '../serviceFactory/options/GetStatementsOptions';
import getNumberOption from 'jscommons/dist/config/getNumberOption';
import StatementsResult from '../models/StatementsResult';
import getStatementsResult from './utils/getStatementsResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementsOptions): Promise<StatementsResult> => {
    checkScopes(STATEMENT_READ_SCOPES, opts.client.scopes);

    let limit = getNumberOption(opts.limit, 100);
    // if limit is set to 0, use a default
    if (limit === 0) {
      limit = 100;
    }

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
