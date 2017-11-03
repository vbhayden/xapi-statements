import { isPlainObject, isArray, isNull } from 'lodash';
import Config from '../Config';

const removeNulls = (data: any): any => {
  if (isPlainObject(data)) {
    return Object.keys(data).reduce<any>((result, key) => {
      const value = data[key];
      if (!isNull(value)) {
        result[key] = removeNulls(value);
      }
      return result;
    }, {});
  }
  if (isArray(data)) {
    return data.reduce((result, value) => {
      if (!isNull(value)) {
        result.push(removeNulls(value));
      }
      return result;
    }, []);
  }
  return data;
};

export default (config: Config) => {
  return (data: any) => {
    /* istanbul ignore next */
    if (!config.enableNullRemoval) return data;

    return removeNulls(data);
  };
};
