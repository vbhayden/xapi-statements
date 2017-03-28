import StatementModel from '../models/StatementModel';
import GetVoiderOptions from '../repo/GetVoiderOptions';
import NoModel from '../errors/NoModel';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetVoiderOptions): Promise<StatementModel> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        model.statement.object.id === opts.objectId
      );
    });
    if (filteredModels.length === 0) {
      throw new NoModel('Statement');
    }
    return filteredModels[0];
  };
};
