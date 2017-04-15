import agentFilterTest from './agentFilterTest';
import agentTest from './agentTest';

describe.skip('get statements by agent in authority', () => {
  agentTest((authority: any) => {
    return { authority };
  }, true);

  describe('identified group members', () => {
    agentFilterTest((actor: any) => {
      return {
        authority: {
          mbox: 'mailto:test@example.com',
          objectType: 'Group',
          member: [{
            ...actor,
            objectType: 'Agent',
          }, {
            mbox: 'mailto:test@example.com',
            objectType: 'Agent',
          }],
        },
      };
    }, true);
  });

  describe('anonymous group members', () => {
    agentFilterTest((actor: any) => {
      return {
        authority: {
          objectType: 'Group',
          member: [{
            ...actor,
            objectType: 'Agent',
          }, {
            mbox: 'mailto:test@example.com',
            objectType: 'Agent',
          }],
        },
      };
    }, true);
  });
});
