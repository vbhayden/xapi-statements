import agentTest from './utils/agentTest';

describe('get statements by agent in sub statement instructor', () => {
  agentTest((instructor: any) => {
    return {
      object: {
        objectType: 'SubStatement',
        actor: {
          mbox: 'mailto:test@example.com',
        },
        verb: {
          id: 'http://www.example.com/verb',
        },
        object: {
          id: 'http://www.example.com/object',
        },
        context: { instructor },
      },
    };
  }, true);
});
