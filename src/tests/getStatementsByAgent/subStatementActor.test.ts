import actorTest from './utils/actorTest';

describe('get statements by agent in sub statement actor', () => {
  actorTest((actor: any) => {
    return {
      object: {
        objectType: 'SubStatement',
        actor,
        verb: {
          id: 'http://www.example.com/verb',
        },
        object: {
          id: 'http://www.example.com/object',
        },
      },
    };
  }, true);
});
