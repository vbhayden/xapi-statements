import Statement from '../../../models/Statement';
import formatStatementObject from './statementObject';
import formatStatementBase from './statementBase';

export default (statement: Statement, langs: string[]): Statement => {
  return {
    ...statement,
    ...formatStatementBase({
      actor: statement.actor,
      verb: statement.verb,
      object: statement.object,
      context: statement.context,
      attachments: statement.attachments,
    }, langs),
    object: formatStatementObject(statement.object, langs),
  };
};
