import { get, isArray } from 'lodash';
import getValue from './getValue';

export default (model: any, basePath: string[] = ['statement', 'verb']): string[] => {
  const verbs = getValue(model, basePath.concat(['id']));
  if (!verbs) return [];

  if (!isArray(verbs)) {
    return [verbs];
  }
  return verbs;
};
