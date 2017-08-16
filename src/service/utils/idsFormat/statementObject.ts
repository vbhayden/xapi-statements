import Activity from '../../../models/Activity'; /* tslint:disable-line:no-unused-variable */
import Agent from '../../../models/Agent'; /* tslint:disable-line:no-unused-variable */
import Group from '../../../models/Group'; /* tslint:disable-line:no-unused-variable */
import IdFormattedActivity from '../../../models/IdFormattedActivity'; /* tslint:disable-line:no-unused-variable */
import IdFormattedActor from '../../../models/IdFormattedActor'; /* tslint:disable-line:no-unused-variable */
/* tslint:disable-next-line:no-unused-variable */
import IdFormattedSubStatement from '../../../models/IdFormattedSubStatement';
import StatementRef from '../../../models/StatementRef'; /* tslint:disable-line:no-unused-variable */
import SubStatement from '../../../models/SubStatement'; /* tslint:disable-line:no-unused-variable */
import IdFormattedStatementObject from '../../../models/IdFormattedStatementObject';
import StatementObject from '../../../models/StatementObject';
import formatSubStatement from './subStatement';
import formatSubStatementObject from './subStatementObject';

export default (statementObject: StatementObject): IdFormattedStatementObject => {
  switch (statementObject.objectType) {
    case 'SubStatement':
      return formatSubStatement(statementObject);
    default:
      return formatSubStatementObject(statementObject);
  }
};
