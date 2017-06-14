import StatementModel from '../models/StatementModel';
import UpRef from '../models/UpRef';
import GetUpRefsByIdsOptions from '../repo/GetUpRefsByIdsOptions';
import Config from './Config';

const getTargetId = (model: StatementModel) => {
  if (model.statement.object.objectType === 'StatementRef') {
    return model.statement.object.id;
  }
  throw new Error('No longer a statement reference');
};

export default (config: Config) => {
  return async (opts: GetUpRefsByIdsOptions): Promise<UpRef[]> => {
    const collection = (await config.db).collection('statements');
    const filteredModels = await collection.find({
      'statement.object.objectType': 'StatementRef',
      'statement.object.id': { $in: opts.targetIds },
    }).toArray() as StatementModel[];

    return filteredModels.map((model) => {
      const sourceId = model.statement.id;
      const targetId = getTargetId(model);
      return { sourceId, targetId };
    });
  };
};
