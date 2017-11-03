import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Config from '../utils/memoryModels/Config';
import Signature, { Opts } from './Signature';

export default (config: Config): Signature => {
  return async ({ client, ids }) => {
    config.state.statements = config.state.statements.map((model) => {
      if (ids.includes(model.statement.id) && matchesClientOption(model, client)) {
        model.voided = true;
      }
      return model;
    });
  };
};
