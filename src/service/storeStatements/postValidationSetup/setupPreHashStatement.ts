import { v4 as uuid } from 'uuid';
import * as modr from '../../utils/modr';

export default (model: any, authority: any): any => {
  return modr.modifyStrictSchema({
    // Adds the required properties from the model.
    id: modr.defaultValue(uuid),
    actor: modr.keepValue,
    verb: modr.keepValue,
    object: modr.keepValue,

    // Adds the optional properties from the model.
    context: modr.keepValue,
    result: modr.keepValue,
    attachments: modr.keepValue,
    timestamp: modr.keepValue,

    // Adds LRS properties.
    authority: modr.overrideValue(authority),
    version: modr.overrideValue('1.0.0'),
  })(model);
};
