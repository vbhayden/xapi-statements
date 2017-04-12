import SubStatementObject from '../../../models/SubStatementObject';
import formatActivity from './activity';

export default (statementObject: SubStatementObject, langs: string[]): SubStatementObject => {
  switch (statementObject.objectType) {
    case 'Activity':
      return formatActivity(statementObject, langs);
    case 'Agent':
    case 'Group':
    case 'StatementRef':
      return statementObject;
    default:
      throw new Error('Invalid object type provided to formatter');
  }
};
