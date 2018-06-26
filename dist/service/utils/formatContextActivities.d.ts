import Activity from '../../models/Activity';
import ContextActivities from '../../models/ContextActivities';
import FormattedContextActivities from '../../models/FormattedContextActivities';
declare const _default: <ActivityFormat>(contextActivities: ContextActivities, formatter: (activity: Activity) => ActivityFormat) => FormattedContextActivities<ActivityFormat>;
export default _default;
