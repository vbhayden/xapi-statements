import StatementBase from '../../models/StatementBase';
import FilterAgent from '../../models/FilterAgent';
import isMatchingAgent from './isMatchingAgent';

export default (statement: StatementBase, filterAgent: FilterAgent): boolean => {
  return (
    isMatchingAgent(statement.actor, filterAgent) ||
    (
      (
        statement.object.objectType === 'Agent' ||
        statement.object.objectType === 'Group'
      ) &&
      isMatchingAgent(statement.object, filterAgent)
    )
  );
};
