import Context from '../../../models/Context';
import IdFormattedContext from '../../../models/IdFormattedContext';
import formatActor from './actor';
import formatActivity from './activity';
import formatContextActivities from '../formatContextActivities';

export default (context: Context): IdFormattedContext => {
  return {
    ...context,
    ...(
      context.instructor === undefined ? {} :
      { instructor: formatActor(context.instructor) }
    ),
    ...(
      context.team === undefined ? {} :
      { team: formatActor(context.team) }
    ),
    ...(
      context.contextActivities === undefined ? {} :
      {
        contextActivities: formatContextActivities(context.contextActivities, formatActivity),
      }
    ),
  };
};
