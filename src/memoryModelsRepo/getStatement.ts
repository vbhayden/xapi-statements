import NoModel from 'jscommons/dist/errors/NoModel';
import StoredStatementModel from '../models/StoredStatementModel';
import GetStatementOptions from '../repoFactory/options/GetStatementOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementOptions): Promise<StoredStatementModel> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.id === opts.id &&
        matchesClientOption(model, opts.client, true) &&
        model.voided === opts.voided
      );
    });
    if (filteredModels.length === 0) {
      throw new NoModel('Statement');
    }
    return filteredModels[0];
  };
};
