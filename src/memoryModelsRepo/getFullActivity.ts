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
      };
    }

    return {
      id: filteredModels[0].id,
      name: filteredModels[0].name,
      description: filteredModels[0].description
    };
  };
};
