import service from '../../tester';
import getStatementTest from './utils/getStatementsTest';

describe('get ids statements and attachments with scopes', () => {
  getStatementTest(async (client) => {
    const result = await service.getIdsStatementsWithAttachments({ client });
    return result.statements;
  })
});
