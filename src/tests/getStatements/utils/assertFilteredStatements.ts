import * as assert from 'assert';
import { isArray } from 'lodash';
import { Service } from '../../../service';
import GetStatementsOptions from '../../../service/options/GetStatementsOptions';

export default (service: Service) => {
  return async (opts: GetStatementsOptions, expectedIds: string[]) => {
    const statements = await service.getExactStatements(opts);
    assert(isArray(statements));
    const actualIds = statements.map((statement) => {
      return statement.id;
    });
    assert.deepEqual(actualIds, expectedIds);
  };
};
