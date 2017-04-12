import IdFormattedSubStatement from '../../../models/IdFormattedSubStatement';
import SubStatement from '../../../models/SubStatement';
import formatStatementBase from './statementBase';
import formatSubStatementObject from './subStatementObject';

export default (statement: SubStatement): IdFormattedSubStatement => {
  return {
    ...statement,
    ...formatStatementBase({
      actor: statement.actor,
      verb: statement.verb,
      object: statement.object,
      context: statement.context,
      attachments: statement.attachments,
    }),
    object: formatSubStatementObject(statement.object),
  };
};
