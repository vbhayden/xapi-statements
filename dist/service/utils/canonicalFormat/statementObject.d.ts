import Activity from '../../../models/Activity';
import Agent from '../../../models/Agent';
import Group from '../../../models/Group';
import StatementRef from '../../../models/StatementRef';
import SubStatement from '../../../models/SubStatement';
declare const _default: (statementObject: Agent | Group | Activity | StatementRef | SubStatement, langs: string[]) => Agent | Group | Activity | StatementRef | SubStatement;
export default _default;
