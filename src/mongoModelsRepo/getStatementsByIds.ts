import Statement from '../models/Statement';
import GetStatementsByIdsOptions from '../repoFactory/options/GetStatementsByIdsOptions';
import matchesClientOption from './utils/matchesClientOption';
import { decodeDotsInStatement } from './utils/replaceDotsInStatement';
import Config from './Config';

interface Result {
  statement: Statement;
}

export default (config: Config) => {
  return async (opts: GetStatementsByIdsOptions): Promise<Statement[]> => {
    const collection = (await config.db).collection('statements');

    const query = {
      'statement.id': { $in: opts.ids },
      ...matchesClientOption(opts.client)
    };

    const project = {
      _id: 0,
      statement: 1,
    };

    const filteredModels = await collection.find(query).project(project).toArray() as Result[];

    const filteredStatements = filteredModels.map((model) => {
      return decodeDotsInStatement(model.statement);
    });
    return filteredStatements;
  };
};
