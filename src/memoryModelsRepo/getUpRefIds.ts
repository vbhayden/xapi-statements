import GetUpRefIdsOptions from '../repoFactory/options/GetUpRefIdsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetUpRefIdsOptions): Promise<string[]> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        model.statement.object.id === opts.id
      );
    });
    return filteredModels.map((model) => {
      return model.statement.id;
    });
  };
};
