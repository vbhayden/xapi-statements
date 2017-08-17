import setup from './utils/setup';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModel from 'jscommons/dist/errors/NoModel';

describe('getClient', () => {
  const service = setup();

  it('should fail to get a client that doesn\'t exist', async () => {
    const promise = service.getClient({ authToken: 'Basic DOESNOTEXIST' });
    await assertError(NoModel, promise);
  });

});
