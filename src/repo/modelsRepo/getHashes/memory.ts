import { includes } from 'lodash';
import StatementHash from '../../../models/StatementHash';
import StoredStatementModel from '../../../models/StoredStatementModel';
import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import Config from '../utils/memoryModels/Config';
import Signature, { Opts } from './Signature';

export default (config: Config): Signature => {
  return async ({ client, ids }) => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        includes(ids, model.statement.id) &&
        matchesClientOption(model, client)
      );
    });
    return filteredModels.map((model: StoredStatementModel): StatementHash => {
      return {
        statementId: model.statement.id,
        hash: model.hash,
      };
    });
  };
};
