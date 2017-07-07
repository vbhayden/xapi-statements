import GetVoidersOptions from '../repoFactory/options/GetVoidersOptions';
import voidQuery from './utils/voidQuery';
import getStatements from './utils/getStatements';
import Config from './Config';

interface Result { statement: { object: { id: string; }; }; }

export default (config: Config) => {
  return async (opts: GetVoidersOptions): Promise<string[]> => {
    const query = { 'statement.object.id': { $in: opts.ids }, ...voidQuery };
    const project = { 'statement.object.id': 1 };
    const results = await getStatements({ config, query, project }) as Result[];
    return results.map((result) => {
      return result.statement.object.id;
    });
  };
};
