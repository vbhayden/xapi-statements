import setupContextActivities from './setupContextActivities';

export default (models: any[]): any[] => {
  return models.map((model) => {
    const contextActivitiesModel = setupContextActivities(model);
    return contextActivitiesModel;
  });
};
