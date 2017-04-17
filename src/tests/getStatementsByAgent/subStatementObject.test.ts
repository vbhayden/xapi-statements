import actorTest from './utils/actorTest';

describe('get statements by agent in sub statement object', () => {
  actorTest((object: any) => {
    return {
      object: {
        objectType: 'SubStatement',
        actor: {
          mbox: 'mailto:test@example.com',
        },
        verb: {
          id: 'http://www.example.com/verb',
        },
        object,
      },
    };
  }, true);
});
