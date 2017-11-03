import Statement from '../../../../models/Statement';
import StatementBase from '../../../../models/StatementBase';
import FilterAgent from '../../../../models/FilterAgent';
import isMatchingAgent from './isMatchingAgent';
import isMatchingUnrelatedAgent from './isMatchingUnrelatedAgent';

const isMatchingRelatedActor = (statement: StatementBase, filterAgent: FilterAgent): boolean => {
  return (
    isMatchingUnrelatedAgent(statement, filterAgent) ||
    (
      statement.context === undefined ? false : (
        (
          statement.context.team === undefined ? false :
          isMatchingAgent(statement.context.team, filterAgent)
        ) ||
        (
          statement.context.instructor === undefined ? false :
          isMatchingAgent(statement.context.instructor, filterAgent)
        )
      )
    ) ||
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
