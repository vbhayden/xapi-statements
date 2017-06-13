import service from '../../tester';
import getStatementTest from './utils/getStatementsTest';

describe('get exact statements with scopes', () => {
  getStatementTest((client) => {
    return service.getExactStatements({ client });
  })
});
