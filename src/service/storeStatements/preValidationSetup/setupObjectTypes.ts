import setupObjectObjectTypes from './setupObjectObjectTypes';
import setupContextObjectTypes from './setupContextObjectTypes';

export default (model: any): any => {
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
