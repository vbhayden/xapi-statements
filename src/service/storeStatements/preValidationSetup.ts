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

const setupArrayObjectTypes = (defaultObjectType: string, objs: any): any => {
  return isArray(objs) ? objs.map((obj: any) => {
    return setupDefaultObjectType(defaultObjectType, obj);
  }) : objs;
};

const setupObjectObjectTypes = (defaultObjectType: string, obj: any) => {
  return !isPlainObject(obj) ? obj : {
    ...setupDefaultObjectType(defaultObjectType, obj),
    ...(
      obj.member === undefined ? {} :
      { member: setupArrayObjectTypes('Agent', obj.member) }
    ),
  };
};

const setupContextActivitiesObjectTypes = (contextActivities: any) => {
  return !isPlainObject(contextActivities) ? contextActivities : {
    ...contextActivities,
    ...(
      contextActivities.parent === undefined ? {} :
      {
        parent: setupArrayObjectTypes(
          'Activity', contextActivities.parent
        )
      }
    ),
    ...(
      contextActivities.grouping === undefined ? {} :
      {
        grouping: setupArrayObjectTypes(
          'Activity', contextActivities.grouping
        )
      }
    ),
    ...(
      contextActivities.category === undefined ? {} :
      {
        category: setupArrayObjectTypes(
          'Activity', contextActivities.category
        )
      }
    ),
    ...(
      contextActivities.other === undefined ? {} :
      {
        other: setupArrayObjectTypes(
          'Activity', contextActivities.other
        )
      }
    ),
  };
};

const setupContextObjectTypes = (context: any) => {
  return !isPlainObject(context) ? context : {
    ...context,
    ...(
      context.team === undefined ? {} :
      { team: setupObjectObjectTypes('Group', context.team) }
    ),
    ...(
      context.instructor === undefined ? {} :
      { instructor: setupObjectObjectTypes('Agent', context.instructor) }
    ),
    ...(
      context.contextActivities === undefined ? {} :
      {
        contextActivities: setupContextActivitiesObjectTypes(
          context.contextActivities
        )
      }
    ),
  };
};

const setupObjectTypes = (model: any): any => {
  return {
    ...model,
    ...(
      model.actor === undefined ? {} :
      { actor: setupObjectObjectTypes('Agent', model.actor) }
    ),
    ...(
      model.object === undefined ? {} :
      { object: setupObjectObjectTypes('Activity', model.object) }
    ),
    ...(
      model.context === undefined ? {} :
      { context: setupContextObjectTypes(model.context) }
    ),
  };
};

export default (models: any[]): any[] => {
  return models.map((model) => {
    const contextActivitiesModel = setupContextActivities(model);
    const objectTypesModel = setupObjectTypes(contextActivitiesModel);
    return objectTypesModel;
  });
};
