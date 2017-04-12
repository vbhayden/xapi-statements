import StatementBase from '../../../models/StatementBase';
import IdFormattedStatementBase from '../../../models/IdFormattedStatementBase';
import formatActor from './actor';
import formatVerb from './verb';
import formatContext from './context';

export default (statement: StatementBase): IdFormattedStatementBase => {
  return {
    ...statement,
    actor: formatActor(statement.actor),
    verb: formatVerb(statement.verb),
    ...(
      statement.context === undefined ? {} :
      { context: formatContext(statement.context) }
    ),
  };
};
