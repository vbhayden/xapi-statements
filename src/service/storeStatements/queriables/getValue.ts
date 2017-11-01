import { get, isArray, isString, union } from 'lodash';

const getValue = (model: any, path: string[], filter: Function = () => { return true; }): any => {
  if (!model) return;
  if (isArray(model)) {
    const values = model.map(m => getValue(m, path)).filter(m => {
      console.log('array filter', m);
      return isString(m);
    });
    return union(values);
  }
  if (filter(model)) {
    return get(model, path, undefined);
  }
  return;
};

export default getValue;
