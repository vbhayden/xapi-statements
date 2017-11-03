import matchesClientOption from '../utils/mongoModels/matchesClientOption';
import Config from '../utils/mongoModels/Config';
import { STATEMENTS_COLLECTION_NAME } from '../utils/mongoModels/constants';
import Signature, { Opts } from './Signature';

export default (config: Config): Signature => {
  return async ({ client, id, refs }) => {
    const collection = (await config.db).collection(STATEMENTS_COLLECTION_NAME);
    const newRefs = refs.map((statement) => {
      return { statement };
    });

    const query = {
      'statement.id': id,
      ...matchesClientOption(client)
    };
    const update = { $set: { refs: newRefs } };
    const options = { multi: false };

    await collection.update(query, update, options);
  };
};
