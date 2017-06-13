import service from '../../tester';
import getStatementTest from './utils/getStatementsTest';

describe('get exact statements and attachments with scopes', () => {
  getStatementTest(async (client) => {
    const result = await service.getExactStatementsWithAttachments({ client });
    return result.statements;
  })
});
