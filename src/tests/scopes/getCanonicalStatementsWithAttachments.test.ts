import service from '../../tester';
import getStatementTest from './utils/getStatementsTest';

describe('get canonical statements and attachments with scopes', () => {
  getStatementTest(async (client) => {
    const result = await service.getCanonicalStatementsWithAttachments({ client, langs: [] });
    return result.statements;
  })
});
