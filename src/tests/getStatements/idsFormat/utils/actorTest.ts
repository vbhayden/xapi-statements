import agentTest from './agentTest';
import groupTest from './groupTest';

export default (createActorStatement: (actor: any) => any) => {
  agentTest(createActorStatement);
  groupTest(createActorStatement);
};
