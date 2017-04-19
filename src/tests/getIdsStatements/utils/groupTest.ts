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

  describe('identified group members', () => {
    agentFormatTest((ifi: any): any => {
      return {
        mbox: 'mailto:test@example.com',
        objectType: 'Group',
        member: [{
          objectType: 'Agent',
          ...ifi,
        }]
      };
    })(createActorStatement);
  });

  describe('anonymous group members', () => {
    agentFormatTest((ifi: any): any => {
      return {
        objectType: 'Group',
        member: [{
          objectType: 'Agent',
          ...ifi,
        }]
      };
    })(createActorStatement);
  });
};
