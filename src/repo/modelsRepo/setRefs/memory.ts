import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Config from '../utils/memoryModels/Config';
import Signature, { Opts } from './Signature';

export default (config: Config): Signature => {
  return async ({ client, id, refs }) => {
    const newRefs = refs.map((statement) => {
      return { statement };
    });
    config.state.statements = config.state.statements.map((model) => {
      if (model.statement.id === id && matchesClientOption(model, client)) {
        return { ...model, refs: newRefs };
      }
      return model;
    });
  };
};
