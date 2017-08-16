import Activity from '../../../models/Activity'; /* tslint:disable-line:no-unused-variable */
import Agent from '../../../models/Agent'; /* tslint:disable-line:no-unused-variable */
import Group from '../../../models/Group'; /* tslint:disable-line:no-unused-variable */
import StatementRef from '../../../models/StatementRef'; /* tslint:disable-line:no-unused-variable */
import SubStatement from '../../../models/SubStatement'; /* tslint:disable-line:no-unused-variable */
import StatementObject from '../../../models/StatementObject';
import formatSubStatement from './subStatement';
import formatSubStatementObject from './subStatementObject';

export default (statementObject: StatementObject, langs: string[]): StatementObject => {
  switch (statementObject.objectType) {
    case 'SubStatement':
      return formatSubStatement(statementObject, langs);
    default:
      return formatSubStatementObject(statementObject, langs);
  }
};
