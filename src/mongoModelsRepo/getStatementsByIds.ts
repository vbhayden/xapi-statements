import Statement from '../models/Statement';
import GetStatementsByIdsOptions from '../repo/GetStatementsByIdsOptions';
import Config from './Config';

interface Result {
  statement: Statement,
}

export default (config: Config) => {
  return async (opts: GetStatementsByIdsOptions): Promise<Statement[]> => {
    const collection = (await config.db).collection('statements');
    const filteredModels = await collection.find({
      'statement.id': { $in: opts.ids },
    }).project({
      _id: 0,
      statement: 1,
    }).toArray() as Result[];

    const filteredStatements = filteredModels.map((model) => {
      return model.statement;
    });
    return filteredStatements;
  };
};
