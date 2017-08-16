import GetUpRefIdsOptions from '../repoFactory/options/GetUpRefIdsOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetUpRefIdsOptions): Promise<string[]> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        model.statement.object.id === opts.id &&
        matchesClientOption(model, opts.client)
      );
    });
    return filteredModels.map((model) => {
      return model.statement.id;
    });
  };
};
