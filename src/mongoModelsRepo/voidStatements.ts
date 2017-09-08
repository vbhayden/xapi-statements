import VoidStatementsOptions from '../repoFactory/options/VoidStatementsOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';
import { STATEMENTS_COLLECTION_NAME } from './utils/constants';

export default (config: Config) => {
  return async (opts: VoidStatementsOptions): Promise<void> => {
    if (opts.ids.length === 0) return;

    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);

    const query = {
      'statement.id': { $in: opts.ids },
      ...matchesClientOption(opts.client)
    };
    const update = { $set: { voided: true } };
    const options = { multi: true };

    await collection.update(query, update, options);
  };
};
