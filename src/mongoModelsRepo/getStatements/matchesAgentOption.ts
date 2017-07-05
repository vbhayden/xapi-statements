import FilterAgent from '../../models/FilterAgent';
import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';
import isMatchingRelatedAgent from './isMatchingRelatedAgent';
import isMatchingUnrelatedAgent from './isMatchingUnrelatedAgent';
import matchesModel from './matchesModel';

const matcher = (statementKey: string, agent: FilterAgent, opts: GetStatementsOptions): Object => {
  return (
    opts.relatedAgents === true ?
      isMatchingRelatedAgent(statementKey, agent) :
      isMatchingUnrelatedAgent(statementKey, agent)
  );
};

export default matchesModel<FilterAgent>(matcher, (opts) => {
  return opts.agent;
});
