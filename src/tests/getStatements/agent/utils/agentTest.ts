import agentFilterTest from './agentFilterTest';
import FilteredStatementsAsserter from '../../utils/FilteredStatementsAsserter';

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  return (createActor: (actor: any) => any, related_agents: boolean) => {
    describe('agent', () => {
      agentFilterTest(assertFilteredStatements)((actor: any) => {
        return createActor({
          ...actor,
          objectType: 'Agent',
        });
      }, related_agents);
    });
  };
};
