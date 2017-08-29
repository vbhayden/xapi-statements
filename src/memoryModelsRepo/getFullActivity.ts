import GetFullActivityOptions from '../repoFactory/options/GetFullActivityOptions';
import GetFullActivityResult from '../repoFactory/results/GetFullActivityResult';
import Config from './Config';
import matchesFullActivity from './utils/matchesFullActivity';

export default (config: Config) => {
  return async (opts: GetFullActivityOptions): Promise<GetFullActivityResult> => {
    const lrsId = opts.client.lrs_id;
    const organisationId = opts.client.organisation;
    const activityId = opts.activityId;

    const filteredModels = config.state.fullActivities.filter((model) => {
      return matchesFullActivity({ activityId, lrsId, model, organisationId });
    });

    if (filteredModels.length === 0) {
      return {
        id: opts.activityId,
        name: {},
        description: {},
        extensions: {},
      };
    }

    const fullActivity = filteredModels[0];
    return {
      id: fullActivity.id,
      name: fullActivity.name,
      description: fullActivity.description,
      extensions: fullActivity.extensions,
      ...(fullActivity.moreInfo !== undefined ? { moreInfo: fullActivity.moreInfo } : {}),
      ...(fullActivity.type !== undefined ? { type: fullActivity.type } : {}),
    };
  };
};
