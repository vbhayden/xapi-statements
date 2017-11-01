import { get, isArray } from 'lodash';
import getValue from './getValue';

export default (model: any, filter: any = undefined): string[] => {
  const filteredModel = !filter ? model : get(model, filter, undefined);
  const verbs = getValue(filteredModel, ['statement', 'registration']);
  if (!verbs) return [];

  if (isArray(verbs)) {
    return verbs;
  }
  return [verbs];
};
