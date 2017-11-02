import Signature, { Opts, Result } from './Signature';
import Config from '../utils/mongoModels/Config';
import matchesFullActivity from '../utils/mongoModels/matchesFullActivity';
import { replaceDotsInExtensions } from '../utils/mongoModels/replaceDotsInStatement';
import { FULL_ACTIVITIES_COLLECTION_NAME } from '../utils/mongoModels/constants';

export default (config: Config): Signature => {
  return async ({ activityId, client }) => {
    const collection = (await config.db).collection(FULL_ACTIVITIES_COLLECTION_NAME);
    const query = matchesFullActivity({
      activityId,
      lrsId: client.lrs_id,
      organisationId: client.organisation,
    });
    const fields = {
      _id: 0,
      id: 1,
      name: 1,
      description: 1,
      extensions: 1,
      moreInfo: 1,
      type: 1,
    };

    const result = await collection.findOne(query, { fields }) as Result | null;

    if (result === null) {
      return {
        id: activityId,
        name: {},
        description: {},
        extensions: {},
      };
    }

    return {
      ...result,
      extensions: replaceDotsInExtensions(/&46;/g, '.')(result.extensions),
    };
  };
};
