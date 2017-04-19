import { isPlainObject, isArray, merge } from 'lodash';

const wrapObjectInArray = (value: any) => {
  return isPlainObject(value) ? [value] : value;
};

const setupContextActivities = (model: any) => {
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

const setupDefaultObjectType = (defaultObjectType: string, obj: any): any => {
  return !isPlainObject(obj) ? obj : {
    objectType: (
      obj.objectType !== undefined ? obj.objectType : defaultObjectType
    ),
    ...obj,
  };
};

const setupMembersObjectTypes = (members: any): any => {
  return isArray(members) ? members.map((member: any) => {
    return setupDefaultObjectType('Agent', member);
  }) : members;
};

const setupObjectObjectTypes = (defaultObjectType: string, obj: any) => {
  const setupActor = setupDefaultObjectType(defaultObjectType, obj);
  return {
    ...setupActor,
    ...(
      obj.member === undefined ? {} :
      { member: setupMembersObjectTypes(obj.member) }
    ),
  };
};

const setupObjectTypes = (model: any): any => {
  return {
    ...model,
    actor: setupObjectObjectTypes('Agent', model.actor),
    object: setupObjectObjectTypes('Activity', model.object),
  };
};

export default (models: any[]): any[] => {
  return models.map((model) => {
    const contextActivitiesModel = setupContextActivities(model);
    const objectTypesModel = setupObjectTypes(contextActivitiesModel);
    return objectTypesModel;
  });
};
