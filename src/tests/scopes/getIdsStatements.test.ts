import service from '../../tester';
import getStatementTest from './utils/getStatementsTest';

describe('get ids statements with scopes', () => {
  getStatementTest((client) => {
    return service.getIdsStatements({ client });
  })
});
