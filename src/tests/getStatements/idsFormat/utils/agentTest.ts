import agentFormatTest from './agentFormatTest';

export default (createActorStatement: (actor: any) => any) => {
  describe('agent', () => {
    agentFormatTest((ifi: any): any => {
      return {
        objectType: 'Agent',
        ...ifi,
      };
    })(createActorStatement);
  });
};
