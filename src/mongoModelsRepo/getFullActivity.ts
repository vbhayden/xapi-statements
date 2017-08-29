import GetFullActivityOptions from '../repoFactory/options/GetFullActivityOptions';
import GetFullActivityResult from '../repoFactory/results/GetFullActivityResult';
import Config from './Config';
import matchesFullActivity from './utils/matchesFullActivity';
import { replaceDotsInExtensions } from './utils/replaceDotsInStatement';

export default (config: Config) => {
  return async (opts: GetFullActivityOptions): Promise<GetFullActivityResult> => {
    const collection = (await config.db).collection('fullActivities');
    const query = matchesFullActivity({
      activityId: opts.activityId,
      lrsId: opts.client.lrs_id,
      organisationId: opts.client.organisation,
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

    const result = await collection.findOne(query, { fields }) as GetFullActivityResult | null;

    if (result === null) {
      return {
        id: opts.activityId,
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
