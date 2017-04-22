import { isPlainObject } from 'lodash';
import setupArrayObjectTypes from './setupArrayObjectTypes';

export default (contextActivities: any) => {
  return !isPlainObject(contextActivities) ? contextActivities : {
    ...contextActivities,
    ...(
      contextActivities.parent === undefined ? {} :
      {
        parent: setupArrayObjectTypes(
          'Activity', contextActivities.parent
        )
      }
    ),
    ...(
      contextActivities.grouping === undefined ? {} :
      {
        grouping: setupArrayObjectTypes(
          'Activity', contextActivities.grouping
        )
      }
    ),
    ...(
      contextActivities.category === undefined ? {} :
      {
        category: setupArrayObjectTypes(
          'Activity', contextActivities.category
        )
      }
    ),
    ...(
      contextActivities.other === undefined ? {} :
      {
        other: setupArrayObjectTypes(
          'Activity', contextActivities.other
        )
      }
    ),
  };
};
