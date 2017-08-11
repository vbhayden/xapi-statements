import Activity from '../../../models/Activity';
import Agent from '../../../models/Agent';
import Group from '../../../models/Group';
import IdFormattedActivity from '../../../models/IdFormattedActivity';
import IdFormattedActor from '../../../models/IdFormattedActor';
import StatementRef from '../../../models/StatementRef';
declare const _default: (statementObject: Agent | Group | Activity | StatementRef) => StatementRef | IdFormattedActor | IdFormattedActivity;
export default _default;
