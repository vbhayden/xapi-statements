import Statement from '../../../models/Statement';
import formatStatementObject from './statementObject';
import formatStatementBase from './statementBase';

export default (statement: Statement, langs: string[]): Statement => {
  return {
    ...statement,
    ...formatStatementBase(statement, langs),
    object: formatStatementObject(statement.object, langs),
  };
};
