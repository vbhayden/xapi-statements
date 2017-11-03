import FilterAgent from '../../../../models/FilterAgent';
import { Opts } from '../Signature';
import isMatchingRelatedAgent from './isMatchingRelatedAgent';
import isMatchingUnrelatedAgent from './isMatchingUnrelatedAgent';
import matchesModel from './matchesModel';

const matcher = (statementKey: string, agent: FilterAgent, opts: Opts): Object => {
  return (
    opts.related_agents === true ?
      isMatchingRelatedAgent(statementKey, agent) :
      isMatchingUnrelatedAgent(statementKey, agent)
  );
};

export default matchesModel<FilterAgent>(matcher, (opts) => {
  return opts.agent;
});
