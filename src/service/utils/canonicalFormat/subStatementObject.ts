import Activity from '../../../models/Activity'; /* tslint:disable-line:no-unused-variable */
import Agent from '../../../models/Agent'; /* tslint:disable-line:no-unused-variable */
import Group from '../../../models/Group'; /* tslint:disable-line:no-unused-variable */
import StatementRef from '../../../models/StatementRef'; /* tslint:disable-line:no-unused-variable */
import SubStatementObject from '../../../models/SubStatementObject';
import formatActivity from './activity';

export default (statementObject: SubStatementObject, langs: string[]): SubStatementObject => {
  switch (statementObject.objectType) {
    case 'Agent':
    case 'Group':
    case 'StatementRef':
      return statementObject;
    case 'Activity':
    default:
      return formatActivity(statementObject, langs);
  }
};
