import Statement from '../models/Statement';
import StatementModel from '../models/StatementModel';
import GetStatementsByIdsOptions from '../repo/GetStatementsByIdsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatementsByIdsOptions): Promise<Statement[]> => {
    const collection = (await config.db).collection('statements');
    const filteredModels = await collection.find({
      'statement.id': { $in: opts.ids },
    }).toArray() as StatementModel[];
    const filteredStatements = filteredModels.map((model) => {
      return model.statement;
    });
    return filteredStatements;
  };
};
