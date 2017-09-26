import agentTest from './agentTest';
import groupTest from './groupTest';
import FilteredStatementsAsserter from '../../utils/FilteredStatementsAsserter';

export default (assertFilteredStatements: FilteredStatementsAsserter) => {
  return (createActor: (actor: any) => any, relatedAgents: boolean = false) => {
    agentTest(assertFilteredStatements)(createActor, relatedAgents);
    groupTest(assertFilteredStatements)(createActor, relatedAgents);
  };
};
