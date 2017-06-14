import VoidStatementsOptions from '../repo/VoidStatementsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: VoidStatementsOptions): Promise<void> => {
    if (opts.ids.length === 0) return;

    const collection = (await config.db).collection('statements');

    const query = { 'statement.id': { $in: opts.ids } };
    const update = { $set: { voided: true } };
    const options = { multi: true };

    await collection.update(query, update, options);
  };
};
