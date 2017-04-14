import Statement from '../../models/Statement';
import StatementBase from '../../models/StatementBase';
import FilterAgent from '../../models/FilterAgent';
import isMatchingAgent from './isMatchingAgent';

const isMatchingRelatedActor = (statement: StatementBase, filterAgent: FilterAgent): boolean => {
  return (
    isMatchingAgent(statement.actor, filterAgent) ||
    (
      (
        statement.object.objectType === 'Agent' ||
        statement.object.objectType === 'Group'
      ) &&
      isMatchingAgent(statement.object, filterAgent)
    ) ||
    (statement.context && (
      isMatchingAgent(statement.context.team, filterAgent) ||
      isMatchingAgent(statement.context.instructor, filterAgent)
    )) ||
    (
      statement.object.objectType === 'SubStatement' &&
      isMatchingRelatedActor(statement.object, filterAgent)
    )
  );
};

export default (statement: Statement, filterAgent: FilterAgent): boolean => {
  return (
    isMatchingAgent(statement.authority, filterAgent) ||
    isMatchingRelatedActor(statement, filterAgent)
  );
};
