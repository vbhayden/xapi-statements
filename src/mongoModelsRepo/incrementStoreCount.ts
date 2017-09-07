import IncrementStoreCountOptions from '../repoFactory/options/IncrementStoreCountOptions';
import Config from './Config';
import { ObjectID } from 'mongodb';
import { LRS_COLLECTION_NAME } from './utils/constants';

export default (config: Config) => {
  return async (opts: IncrementStoreCountOptions): Promise<void> => {
    const collection = (await config.db).collection(LRS_COLLECTION_NAME);
    await collection.updateOne({ lrs_id: new ObjectID(opts.client.lrs_id) }, { $inc: { statementCount: opts.count } });
  };
};
