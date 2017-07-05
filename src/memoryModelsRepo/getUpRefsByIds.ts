import { includes } from 'lodash';
import ChangedStatementRef from '../errors/ChangedStatementRef';
import StoredStatementModel from '../models/StoredStatementModel';
import UpRef from '../models/UpRef';
import GetUpRefsByIdsOptions from '../repoFactory/options/GetUpRefsByIdsOptions';
import Config from './Config';

const getTargetId = (model: StoredStatementModel) => {
  if (model.statement.object.objectType === 'StatementRef') {
    return model.statement.object.id;
  }
  throw new ChangedStatementRef(model.statement.id);
};

export default (config: Config) => {
  return async (opts: GetUpRefsByIdsOptions): Promise<UpRef[]> => {
    const filteredModels = config.state.statements.filter((model) => {
      return (
        model.statement.object.objectType === 'StatementRef' &&
        includes(opts.targetIds, model.statement.object.id)
      );
    });
    return filteredModels.map((model) => {
      const sourceId = model.statement.id;
      const targetId = getTargetId(model);
      return { sourceId, targetId };
    });
  };
};
