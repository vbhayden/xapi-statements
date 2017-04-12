import IdFormattedStatement from '../../../models/IdFormattedStatement';
import Statement from '../../../models/Statement';
import formatActor from './actor';
import formatStatementObject from './statementObject';
import formatStatementBase from './statementBase';

export default (statement: Statement): IdFormattedStatement => {
  return {
    ...statement,
    ...formatStatementBase({
      actor: statement.actor,
      verb: statement.verb,
      object: statement.object,
      context: statement.context,
      attachments: statement.attachments,
    }),
    authority: formatActor(statement.authority),
    object: formatStatementObject(statement.object),
  };
};
