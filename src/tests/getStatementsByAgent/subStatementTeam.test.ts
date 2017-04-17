import groupTest from './utils/groupTest';

describe('get statements by agent in sub statement team', () => {
  groupTest((team: any) => {
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
        context: { team },
      },
    };
  }, true);
});
