import agentTest from './agentTest';
import groupTest from './groupTest';

export default (createActor: (actor: any) => any, relatedAgents: boolean = false) => {
  agentTest(createActor, relatedAgents);
  groupTest(createActor, relatedAgents);
};
