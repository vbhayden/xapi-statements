import agentFilterTest from './agentFilterTest';

export default (createActor: (actor: any) => any, relatedAgents: boolean = false) => {
  describe('group', () => {
    agentFilterTest((actor: any) => {
      return createActor({
        ...actor,
        objectType: 'Group',
      });
    }, relatedAgents);
  });

  describe('identified group members', () => {
    agentFilterTest((actor: any) => {
      return createActor({
        mbox: 'mailto:test@example.com',
        objectType: 'Group',
        member: [{
          ...actor,
          objectType: 'Agent',
        }]
      });
    }, relatedAgents);
  });

  describe('anonymous group members', () => {
    agentFilterTest((actor: any) => {
      return createActor({
        objectType: 'Group',
        member: [{
          ...actor,
          objectType: 'Group',
        }]
      });
    }, relatedAgents);
  });
};
