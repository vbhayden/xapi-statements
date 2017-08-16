import Activity from '../../../models/Activity'; /* tslint:disable-line:no-unused-variable */
import Agent from '../../../models/Agent'; /* tslint:disable-line:no-unused-variable */
import Group from '../../../models/Group'; /* tslint:disable-line:no-unused-variable */
import IdFormattedActivity from '../../../models/IdFormattedActivity'; /* tslint:disable-line:no-unused-variable */
import IdFormattedActor from '../../../models/IdFormattedActor'; /* tslint:disable-line:no-unused-variable */
import StatementRef from '../../../models/StatementRef'; /* tslint:disable-line:no-unused-variable */
import IdFormattedSubStatementObject from '../../../models/IdFormattedSubStatementObject';
import SubStatementObject from '../../../models/SubStatementObject';
import formatActor from './actor';
import formatActivity from './activity';

export default (statementObject: SubStatementObject): IdFormattedSubStatementObject => {
  switch (statementObject.objectType) {
    case 'Agent':
    case 'Group':
      return formatActor(statementObject);
    case 'StatementRef':
      return statementObject;
    case 'Activity':
    default:
      return formatActivity(statementObject);
  }
};
