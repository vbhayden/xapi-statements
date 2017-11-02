import { includes } from 'lodash';
import Statement from '../../../models/Statement';
import Signature, { Opts } from './Signature';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Config from '../utils/memoryModels/Config';

export default (config: Config): Signature => {
  return async ({ client, ids }) => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        includes(ids, model.statement.id) &&
        matchesClientOption(model, client)
      );
    });
    const filteredStatements = filteredModels.map((model) => {
      return model.statement;
    });
    return filteredStatements;
  };
};
