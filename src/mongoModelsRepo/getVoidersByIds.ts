import GetVoidersOptions from '../repoFactory/options/GetVoidersOptions';
import getVoidersByIds from './utils/getVoidersByIds';
import Config from './Config';

interface Result {
  statement: {
    id: string;
  };
}

export default (config: Config) => {
  return async (opts: GetVoidersOptions): Promise<string[]> => {
    const searchKey = 'statement.id';
    const results = await getVoidersByIds({ config, searchKey, ...opts }) as Result[];
    return results.map((result) => {
      return result.statement.id;
    });
  };
};
