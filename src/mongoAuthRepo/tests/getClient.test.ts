import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import * as btoa from 'btoa';
import config from '../../config';
import { MongoClient } from 'mongodb';
import mongoAuthRepo from '../../mongoAuthRepo';
import createClientModel from '../../tests/utils/createClientModel';
import * as assert from 'assert';

const TEST_CLIENT_MODEL = createClientModel({
  _id: '5988f0f00000000000000123'
});
const TEST_BASIC_KEY = '123';
const TEST_BASIC_SECRET = 'abc';
const TEST_TOKEN = `Basic ${btoa(`${TEST_BASIC_KEY}:${TEST_BASIC_SECRET}`)}`;

describe('getClient from mongo client', () => {
  const db = MongoClient.connect(config.mongo.url);
  const authConfig = { db };
  const authRepo = mongoAuthRepo(authConfig);

  it('should return a client from the db', async () => {
    const testDocument = {
      ...TEST_CLIENT_MODEL,
      api: {
        basic_key: TEST_BASIC_KEY,
        basic_secret: TEST_BASIC_SECRET,
      },
      authority: JSON.stringify(TEST_CLIENT_MODEL),
    };
    await (await db).collection('client').insert(testDocument);
    const result = await authRepo.getClient({ authToken: TEST_TOKEN });
    assert.equal(result.client._id, TEST_CLIENT_MODEL._id);
  });

  it('should error when getting without any clients in the DB', async () => {
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  afterEach(async () => {
    await (await db).collection('client').remove({});
  });
});
