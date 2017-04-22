import { isPlainObject } from 'lodash';

const wrapObjectInArray = (value: any) => {
  return isPlainObject(value) ? [value] : value;
};

export default (model: any) => {
  const hasContextActivities = (
    isPlainObject(model) &&
    isPlainObject(model.context) &&
    isPlainObject(model.context.contextActivities)
  );
  if (!hasContextActivities) return model;
  const contextActivities = model.context.contextActivities;
  const parent = wrapObjectInArray(contextActivities.parent);
  const grouping = wrapObjectInArray(contextActivities.grouping);
  const category = wrapObjectInArray(contextActivities.category);
  const other = wrapObjectInArray(contextActivities.other);
  return {
    ...model,
    context: {
      ...model.context,
      contextActivities: {
        ...model.context.contextActivities,
        parent,
        grouping,
        category,
        other,
      },
    },
  };
};
