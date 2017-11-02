import voidQuery from '../utils/mongoModels/voidQuery';
import getStatements from '../utils/mongoModels/getStatements';
import Config from '../utils/mongoModels/Config';
import Signature, { Opts } from './Signature';

interface Result { statement: { object: { id: string; }; }; }

export default (config: Config): Signature => {
  return async ({ client, ids }) => {
    const query = {
      'statement.object.id': { $in: ids },
      ...voidQuery
    };
    const project = { 'statement.object.id': 1 };
    const results = await getStatements({ config, query, project, client }) as Result[];

    return results.map((result) => {
      return result.statement.object.id;
    });
  };
};
