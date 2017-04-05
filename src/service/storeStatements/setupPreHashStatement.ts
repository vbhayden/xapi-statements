import { v4 as uuid } from 'uuid';

const addOptionalProp = (model: any, propName: string): any => {
  return model[propName] === undefined ? {} : { [propName]: model[propName] };
};

export default (model: any): any => {
  return {
    // Adds the required properties from the model.
    actor: model.actor,
    verb: model.verb,
    object: model.object,

    // Adds the optional properties from the model.
    ...addOptionalProp(model, 'context'),
    ...addOptionalProp(model, 'result'),
    ...addOptionalProp(model, 'attachments'),
    ...addOptionalProp(model, 'timestamp'),

    // Generates missing properties where required.
    id: (
      model.id === undefined ?
      uuid() :
      model.id
    ),

    // Adds LRS properties.
    version: '1.0.0',
    authority: {
      objectType: 'Agent',
      mbox: 'authority@example.com',
    },
  };
};
