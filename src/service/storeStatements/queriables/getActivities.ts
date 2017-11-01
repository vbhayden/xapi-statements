import { get, isArray } from 'lodash';
import getValue from './getValue';

const activityFilter = (basePath: string[], model: any): Boolean => {
  console.log('filter', basePath, model);
  return get(model, basePath.concat(['objectType'])) === 'Activity';
};

export default (model: any, basePath: string[] = ['statement', 'object']): string[] => {
  const activities = getValue(model, basePath.concat(['id']), activityFilter.bind(null, basePath));
  if (!activities) return [];

  if (!isArray(activities)) {
    return [activities];
  }
  return activities;
};
