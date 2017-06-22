import GetDownRefIdOptions from '../repo/GetDownRefIdOptions';
import NoModel from '../errors/NoModel';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetDownRefIdOptions): Promise<string> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        model.statement.id === opts.id
      );
    });
    if (filteredModels.length === 0) {
      throw new NoModel('Statement');
    }
    const statementObject = filteredModels[0].statement.object;
    if (statementObject.objectType === 'StatementRef') {
      return statementObject.id;
    }
    throw new Error('No longer a StatementRef.');
  };
};
