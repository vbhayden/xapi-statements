import Statement from '../../models/Statement';
import GetStatementsOptions from '../../repo/GetStatementsOptions';
import isMatchingRelatedAgent from './isMatchingRelatedAgent';
import isMatchingUnrelatedAgent from './isMatchingUnrelatedAgent';

export default (statement: Statement, opts: GetStatementsOptions): boolean => {
  return (
    opts.agent === undefined ? true :
    (
      opts.relatedAgents === true ?
      isMatchingRelatedAgent(statement, opts.agent) :
      isMatchingUnrelatedAgent(statement, opts.agent)
    )
  );
};
