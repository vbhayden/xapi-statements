import StatementModel from '../../models/StatementModel';
import GetStatementsOptions from '../options/GetStatementsOptions';
import Config from '../Config';

export default (config: Config) => {
  return (opts: GetStatementsOptions): Promise<StatementModel[]> => {
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
    });
  };
};
