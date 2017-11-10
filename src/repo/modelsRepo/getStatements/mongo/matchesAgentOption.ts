import FilterAgent from '../../../../models/FilterAgent';
import { Opts } from '../Signature';
import getActorIdent from '../../../../utils/getActorIdent';
import matchesModel from './matchesModel';

const matcher = (agent: FilterAgent, opts: Opts): Object => {
  const agentIdent = getActorIdent(agent);
  if (opts.related_agents) {
    return { relatedAgents: agentIdent };
  }
  return { agents: agentIdent };
};

export default matchesModel<FilterAgent>(matcher, (opts) => {
  return opts.agent;
});
