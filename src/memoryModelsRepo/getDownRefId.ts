import NoModel from 'jscommons/dist/errors/NoModel';
import GetDownRefIdOptions from '../repoFactory/options/GetDownRefIdOptions';
import ChangedStatementRef from '../errors/ChangedStatementRef';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetDownRefIdOptions): Promise<string> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        model.statement.id === opts.id &&
        matchesClientOption(model, opts.client)
      );
    });
    if (filteredModels.length === 0) {
      throw new NoModel('Statement');
    }
    const statementObject = filteredModels[0].statement.object;
    if (statementObject.objectType === 'StatementRef') {
      return statementObject.id;
    }

    /* istanbul ignore next */
    throw new ChangedStatementRef(opts.id);
  };
};
