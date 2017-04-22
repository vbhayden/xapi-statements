import { isPlainObject } from 'lodash';
import setupObjectObjectTypes from './setupObjectObjectTypes';
import setupContextActivitiesObjectTypes from './setupContextActivitiesObjectTypes';

export default (context: any) => {
  return !isPlainObject(context) ? context : {
    ...context,
    ...(
      context.team === undefined ? {} :
      { team: setupObjectObjectTypes('Group', context.team) }
    ),
    ...(
      context.instructor === undefined ? {} :
      { instructor: setupObjectObjectTypes('Agent', context.instructor) }
    ),
    ...(
      context.contextActivities === undefined ? {} :
      {
        contextActivities: setupContextActivitiesObjectTypes(
          context.contextActivities
        )
      }
    ),
  };
};
