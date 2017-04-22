import setupContextActivities from './setupContextActivities';
import setupObjectTypes from './setupObjectTypes';

export default (models: any[]): any[] => {
  return models.map((model) => {
    const contextActivitiesModel = setupContextActivities(model);
    const objectTypesModel = setupObjectTypes(contextActivitiesModel);
    return objectTypesModel;
  });
};
