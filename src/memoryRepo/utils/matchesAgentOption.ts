import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repo/GetStatementsOptions';
import isMatchingRelatedActor from './isMatchingRelatedActor';
import isMatchingActor from './isMatchingActor';

export default (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.agent === undefined ? true :
    (
      opts.relatedAgents === true ?
      isMatchingRelatedActor(statement, opts.agent) :
      isMatchingActor(statement.actor, opts.agent)
    )
  );
};
