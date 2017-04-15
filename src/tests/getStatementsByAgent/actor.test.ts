import agentTest from './agentTest';

describe('get statements by agent in actor agent', () => {
  agentTest((actor: any) => {
    return {
      actor: {
        ...actor,
        objectType: 'Agent',
      }
    };
  });
});

describe('get statements by agent in actor group', () => {
  agentTest((actor: any) => {
    return {
      actor: {
        ...actor,
        objectType: 'Group',
      }
    };
  });
});

describe('get statements by agent in actor identified group members', () => {
  agentTest((actor: any) => {
    return {
      actor: {
        mbox: 'mailto:test@example.com',
        objectType: 'Group',
        member: [{
          ...actor,
          objectType: 'Agent',
        }]
      }
    };
  });
});

describe('get statements by agent in actor anonymous group members', () => {
  agentTest((actor: any) => {
    return {
      actor: {
        mbox: 'mailto:test@example.com',
        objectType: 'Group',
        member: [{
          ...actor,
          objectType: 'Group',
        }]
      }
    };
  });
});
