import * as modr from '../../utils/modr';

export default (model: any, storedTime: string): any => {
  return modr.modifySchema({
    timestamp: modr.defaultValue(() => storedTime),
    stored: modr.overrideValue(storedTime),
  })(model);
};
