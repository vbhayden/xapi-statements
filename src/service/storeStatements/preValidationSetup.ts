import { isPlainObject, merge } from 'lodash';

const wrapObjectInArray = (value: any) => {
  return isPlainObject(value) ? [value] : value;
};

const setupContextActivities = (model: any) => {
  const hasContextActivities = (
    isPlainObject(model) &&
    isPlainObject(model.context) &&
    isPlainObject(model.context.contextActivities)
  );
  if (!hasContextActivities) return {};
  const contextActivities = model.context.contextActivities;
  const parent = wrapObjectInArray(contextActivities.parent);
  const grouping = wrapObjectInArray(contextActivities.grouping);
  const category = wrapObjectInArray(contextActivities.category);
  const other = wrapObjectInArray(contextActivities.other);
  return {
    context: {
      contextActivities: {
        parent,
        grouping,
        category,
        other,
      },
    },
  };
};

export default (models: any[]) => {
  return models.map((model) => {
    const contextActivitiesModel = setupContextActivities(model);
    return merge({}, model, contextActivitiesModel);
  });
};
