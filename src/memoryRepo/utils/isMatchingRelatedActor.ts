import Statement from '../../models/Statement';
import StatementBase from '../../models/StatementBase';
import Actor from '../../models/Actor';
import isMatchingActor from './isMatchingActor';

const isMatchingRelatedActor = (statement: StatementBase, filterActor: Actor): boolean => {
  return (
    isMatchingActor(statement.actor, filterActor) ||
    (
      (
        statement.object.objectType === 'Agent' ||
        statement.object.objectType === 'Group'
      ) &&
      isMatchingActor(statement.object, filterActor)
    ) ||
    (statement.context && (
      isMatchingActor(statement.context.team, filterActor) ||
      isMatchingActor(statement.context.instructor, filterActor)
    )) ||
    (
      statement.object.objectType === 'SubStatement' &&
      isMatchingRelatedActor(statement.object, filterActor)
    )
  );
};

export default (statement: Statement, filterActor: Actor): boolean => {
  return (
    isMatchingActor(statement.authority, filterActor) ||
    isMatchingRelatedActor(statement, filterActor)
  );
};
