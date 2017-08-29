import UpdateFullActivitiesOptions from '../repoFactory/options/UpdateFullActivitiesOptions';
import Config from './Config';
import matchesFullActivity from './utils/matchesFullActivity';

export default (config: Config) => {
  return async (opts: UpdateFullActivitiesOptions): Promise<void> => {
    const lrsId = opts.client.lrs_id;
    const organisationId = opts.client.organisation;

    opts.updates.forEach((update) => {
      const activityId = update.activityId;
      const existingModels = config.state.fullActivities;
      const matchingModels = existingModels.filter((model) => {
        return matchesFullActivity({ activityId, lrsId, model, organisationId });
      });

      // Creates a new full activity when the activity doesn't exist.
      if (matchingModels.length === 0) {
        config.state.fullActivities = [
          ...existingModels,
          {
            id: activityId,
            lrsId,
            organisationId,
            name: update.name,
            description: update.description,
          },
        ];
        return;
      }

      // Updates the full activity when it already exists.
      config.state.fullActivities = existingModels.map((model) => {
        if (!matchesFullActivity({ activityId, lrsId, model, organisationId })) {
          return model;
        }
        return {
          ...model,
          name: {
            ...model.name,
            ...update.name,
          },
          description: {
            ...model.description,
            ...update.description,
          },
        };
      });
    });
  };
};
