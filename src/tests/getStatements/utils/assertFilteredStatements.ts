import * as assert from 'assert';
import { isArray } from 'lodash';
import FilteredStatementsAsserter from './FilteredStatementsAsserter';

const assertFilteredStatements: FilteredStatementsAsserter = (service) => {
  return async (opts, expectedIds) => {
    const statements = await service.getExactStatements(opts);
    assert(isArray(statements));
    const actualIds = statements.map((statement) => {
      return statement.id;
    });
    assert.deepEqual(actualIds, expectedIds);
  };
};

export default assertFilteredStatements;
