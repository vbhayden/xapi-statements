export default (overrides: any) => {
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
      ...overrides,
    },
  };
};
