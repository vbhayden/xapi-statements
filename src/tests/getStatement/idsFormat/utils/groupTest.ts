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
        ...ifi,
        objectType: 'Group',
      };
    }, (ifi: any): any => {
      return {
        ...ifi,
        objectType: 'Group',
        member: [{
          objectType: 'Agent',
          mbox: 'mailto:test@example.com',
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
