import agentFilterTest from './agentFilterTest';

export default (createActor: (actor: any) => any) => {
  describe('agent', () => {
    agentFilterTest((actor: any) => {
      return createActor({
        ...actor,
        objectType: 'Agent',
      });
    });
  });

  describe('group', () => {
    agentFilterTest((actor: any) => {
      return createActor({
        ...actor,
        objectType: 'Group',
      });
    });
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
    });
  });

  describe('anonymous group members', () => {
    agentFilterTest((actor: any) => {
      return createActor({
        mbox: 'mailto:test@example.com',
        objectType: 'Group',
        member: [{
          ...actor,
          objectType: 'Group',
        }]
      });
    });
  });
};
