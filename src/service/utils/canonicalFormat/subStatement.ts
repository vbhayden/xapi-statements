import SubStatement from '../../../models/SubStatement';
import formatStatementBase from './statementBase';
import formatSubStatementObject from './subStatementObject';

export default (statement: SubStatement, langs: string[]): SubStatement => {
  return {
    ...statement,
    ...formatStatementBase({
      actor: statement.actor,
      verb: statement.verb,
      object: statement.object,
      context: statement.context,
      attachments: statement.attachments,
    }, langs),
    object: formatSubStatementObject(statement.object, langs),
  };
};
