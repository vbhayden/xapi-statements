import IdFormattedStatement from '../../../models/IdFormattedStatement';
import Statement from '../../../models/Statement';
import formatActor from './actor';
import formatStatementObject from './statementObject';
import formatStatementBase from './statementBase';

export default (statement: Statement): IdFormattedStatement => {
  return {
    ...statement,
    ...formatStatementBase(statement),
    authority: formatActor(statement.authority),
    object: formatStatementObject(statement.object),
  };
};
