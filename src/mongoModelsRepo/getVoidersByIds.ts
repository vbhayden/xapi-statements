import GetVoidersOptions from '../repoFactory/options/GetVoidersOptions';
import voidQuery from './utils/voidQuery';
import getStatements from './utils/getStatements';
import Config from './Config';

interface Result { statement: { id: string; }; }

export default (config: Config) => {
  return async (opts: GetVoidersOptions): Promise<string[]> => {
    const query = { 'statement.id': { $in: opts.ids }, ...voidQuery };
    const project = { 'statement.id': 1 };
    const results = await getStatements({ config, query, project }) as Result[];
    return results.map((result) => {
      return result.statement.id;
    });
  };
};
