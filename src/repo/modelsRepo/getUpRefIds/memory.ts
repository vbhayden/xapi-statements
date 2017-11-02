import Signature, { Opts } from './Signature';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Config from '../utils/memoryModels/Config';

export default (config: Config): Signature => {
  return async ({ client, id }) => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        model.statement.object.id === id &&
        matchesClientOption(model, client)
      );
    });
    return filteredModels.map((model) => {
      return model.statement.id;
    });
  };
};
