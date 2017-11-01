import { get, isArray } from 'lodash';
import getValue from './getValue';

export default (model: any, basePath: string[] = ['statement']): string[] => {
  const registrations = getValue(model, basePath.concat(['registration']));
  if (!registrations) return [];

  if (!isArray(registrations)) {
    return [registrations];
  }
  return registrations;
};
