import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repo/GetStatementsOptions';
import isMatchingRelatedAgent from './isMatchingRelatedAgent';
import isMatchingAgent from './isMatchingAgent';

export default (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.agent === undefined ? true :
    (
      opts.relatedAgents === true ?
      isMatchingRelatedAgent(statement, opts.agent) :
      isMatchingAgent(statement.actor, opts.agent)
    )
  );
};
