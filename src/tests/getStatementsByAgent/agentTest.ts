import agentFilterTest from './agentFilterTest';

export default (createActor: (actor: any) => any, relatedAgents: boolean = false) => {
  describe('agent', () => {
    agentFilterTest((actor: any) => {
      return createActor({
        ...actor,
        objectType: 'Agent',
      });
    }, relatedAgents);
  });
};
