import agentFilterTest from './agentFilterTest';
import FilteredStatementsAsserter from '../../utils/FilteredStatementsAsserter';

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  return (createActor: (actor: any) => any, related_agents: boolean) => {
    describe('identified group', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          ...actor,
          objectType: 'Group',
        });
      }, related_agents);
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
      }, related_agents);
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
      }, related_agents);
    });
  };
};
