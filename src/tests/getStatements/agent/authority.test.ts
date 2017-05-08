import agentFilterTest from './utils/agentFilterTest';
import agentTest from './utils/agentTest';
import assertFilteredStatements from '../utils/assertFilteredStatements';

describe('get statements by agent in authority', () => {
  agentTest(assertFilteredStatements)((authority: any) => {
    return { authority };
  }, true);

  describe('identified group members', () => {
    agentFilterTest(assertFilteredStatements)((actor: any) => {
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
    agentFilterTest(assertFilteredStatements)((actor: any) => {
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
