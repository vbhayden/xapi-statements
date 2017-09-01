import * as modr from '../../../utils/modr';
import { xapiStatementVersion } from '../../../utils/constants';

export default (model: any, storedTime: string, authority: any): any => {
  return modr.modifySchema({
    timestamp: modr.defaultValue(() => storedTime),
    stored: modr.overrideValue(storedTime),

    // Adds LRS properties.
    authority: modr.overrideValue(authority),
    version: modr.defaultValue(() => xapiStatementVersion),
  })(model);
};
