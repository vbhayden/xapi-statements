import { get, isArray, isString } from 'lodash';

const getValue = (model: any, path: string[]): any => {
  if (!model) return;
  if (isArray(model)) {
    return model.map(m => getValue(m, path)).filter(m => {
      return isArray(m) || isString(m);
    });
  }
  return get(model, path, undefined);
};

export default getValue;
