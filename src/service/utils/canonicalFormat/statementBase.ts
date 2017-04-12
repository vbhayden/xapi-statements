import StatementBase from '../../../models/StatementBase';
import formatVerb from './verb';
import formatContext from './context';

export default (statement: StatementBase, langs: string[]): StatementBase => {
  return {
    ...statement,
    verb: formatVerb(statement.verb, langs),
    ...(
      statement.context === undefined ? {} :
      { context: formatContext(statement.context, langs) }
    ),
  };
};
