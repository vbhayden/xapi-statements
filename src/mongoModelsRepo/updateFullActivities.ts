import { mapKeys, Dictionary } from 'lodash';
import UpdateFullActivitiesOptions from '../repoFactory/options/UpdateFullActivitiesOptions';
import Config from './Config';
import matchesFullActivity from './utils/matchesFullActivity';
import { replaceDotsInExtensions } from './utils/replaceDotsInStatement';
import { FULL_ACTIVITIES_COLLECTION_NAME } from './utils/constants';

const getPatchUpdate = <T>(patch: Dictionary<T>, parentKeys: string[]) => {
  return mapKeys<T, string>(patch, (_value, key) => {
    const parentPath = parentKeys.join('.');
    return `${parentPath}.${key}`;
  });
};

export default (config: Config) => {
  return async (opts: UpdateFullActivitiesOptions): Promise<void> => {
    const collection = (await config.db).collection(FULL_ACTIVITIES_COLLECTION_NAME);
    const lrsId = opts.client.lrs_id;
    const organisationId = opts.client.organisation;
    const batch = collection.initializeUnorderedBulkOp();

    opts.updates.forEach((update) => {
      const activityId = update.activityId;
      const extensions = replaceDotsInExtensions(/\./g, '&46;')(update.extensions);
      const mongoQuery = matchesFullActivity({ activityId, lrsId, organisationId });
      const mongoUpdate = {
        $set: {
          ...getPatchUpdate(update.name, ['name']),
          ...getPatchUpdate(update.description, ['description']),
          ...getPatchUpdate(extensions, ['extensions']),
          ...(update.moreInfo !== undefined ? { moreInfo: update.moreInfo } : {}),
          ...(update.type !== undefined ? { type: update.type } : {}),
        },
      };

      batch.find(mongoQuery).upsert().updateOne(mongoUpdate);
    });

    if (opts.updates.length > 0) {
      await batch.execute();
    }
  };
};
