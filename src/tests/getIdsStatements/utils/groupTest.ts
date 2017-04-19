import agentFormatTest from './agentFormatTest';

export default (createActorStatement: (actor: any) => any) => {
  describe('identified group', () => {
    agentFormatTest((ifi: any): any => {
      return {
        objectType: 'Group',
        ...ifi,
      };
    })(createActorStatement);
  });
};
