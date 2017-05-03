import agentFilterTest from './agentFilterTest';
import FilteredStatementsAsserter from '../../utils/FilteredStatementsAsserter';

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  return (createActor: (actor: any) => any, relatedAgents: boolean = false) => {
    describe('identified group', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          ...actor,
          objectType: 'Group',
        });
      }, relatedAgents);
    });

    describe('identified group members', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          mbox: 'mailto:test@example.com',
          objectType: 'Group',
          member: [{
            ...actor,
            objectType: 'Agent',
          }]
        });
      }, relatedAgents);
    });

    describe('anonymous group members', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          objectType: 'Group',
          member: [{
            ...actor,
            objectType: 'Group',
          }]
        });
      }, relatedAgents);
    });
  };
};
