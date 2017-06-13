import service from '../../tester';
import getStatementTest from './utils/getStatementsTest';

describe('get canonical statements with scopes', () => {
  getStatementTest((client) => {
    return service.getCanonicalStatements({ client, langs: [] });
  })
});