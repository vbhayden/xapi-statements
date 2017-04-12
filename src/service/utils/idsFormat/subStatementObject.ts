import IdFormattedSubStatementObject from '../../../models/IdFormattedSubStatementObject';
import SubStatementObject from '../../../models/SubStatementObject';
import formatActor from './actor';
import formatActivity from './activity';

export default (statementObject: SubStatementObject): IdFormattedSubStatementObject => {
  switch (statementObject.objectType) {
    case 'Agent':
    case 'Group':
      return formatActor(statementObject);
    case 'Activity':
      return formatActivity(statementObject);
    case 'StatementRef':
      return statementObject;
    default:
      throw new Error('Invalid object type provided to formatter');
  }
};
