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
