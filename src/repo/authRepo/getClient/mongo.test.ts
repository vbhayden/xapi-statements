import * as btoa from 'btoa';
import NoModel from 'jscommons/dist/errors/NoModel';
import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { ObjectID } from 'mongodb';
import { MongoClient } from 'mongodb';
import * as assert from 'assert';
import { once } from 'lodash';
import config from '../../../config';
import logger from '../../../logger';
import mongoFactory from '../utils/mongoAuth/factory';
import createClientModel from '../../../tests/utils/createClientModel';
import connectToMongoDb from '../../utils/connectToMongoDb';
import ExpiredClientError from '../../../errors/ExpiredClientError';
import UntrustedClientError from '../../../errors/UntrustedClientError';

const TEST_CLIENT_MODEL = createClientModel({
  _id: '5988f0f00000000000000123',
});
const TEST_BASIC_KEY = '123';
const TEST_BASIC_SECRET = 'abc';
const TEST_TOKEN = `Basic ${btoa(`${TEST_BASIC_KEY}:${TEST_BASIC_SECRET}`)}`;
const TEST_CLIENT = {
  ...TEST_CLIENT_MODEL,
  _id: new ObjectID('5988f0f00000000000000123'),
  api: {
    basic_key: TEST_BASIC_KEY,
    basic_secret: TEST_BASIC_SECRET,
  },
  authority: JSON.stringify(TEST_CLIENT_MODEL),
  organisation: new ObjectID('5988f0f00000000000000000'),
  lrs_id: new ObjectID('5988f0f00000000000000001'),
};
const TEST_ORG = {
  _id: new ObjectID('5988f0f00000000000000000'),
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
  name: 'Test Org',
};
const TEST_STORE = {
  _id: new ObjectID('5988f0f00000000000000001'),
  organisation: new ObjectID('5988f0f00000000000000000'),
  createdAt: new Date('2017-10-25T14:39:44.962Z'),
  updatedAt: new Date('2017-10-25T14:39:58.376Z'),
  title: 'Test LRS',
  description: 'Test LRS Description',
  statementCount: 0,
};

describe(__filename, () => {
  const connection = connectToMongoDb();
  const authRepo = mongoFactory({ db: connection });

  beforeEach(async () => {
    const db = await connection();
    await db.dropDatabase();
  });

  it('should return a client from the db', async () => {
    const db = await connection();
    await db.collection('organisations').insert(TEST_ORG);
    await db.collection('lrs').insert(TEST_STORE);
    await db.collection('client').insert(TEST_CLIENT);
    const result = await authRepo.getClient({ authToken: TEST_TOKEN });
    assert.equal(result.client._id, TEST_CLIENT_MODEL._id);
  });

  it('should error when getting without any clients in the DB', async () => {
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a untrusted client', async () => {
    const db = await connection();
    await db.collection('client').insert({
      ...TEST_CLIENT,
      isTrusted: false,
    });
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(UntrustedClientError, promise);
  });

  it('should error when getting a client with a missing store', async () => {
    const db = await connection();
    await db.collection('organisations').insert(TEST_ORG);
    await db.collection('client').insert(TEST_CLIENT);
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a client with a missing org', async () => {
    const db = await connection();
    await db.collection('lrs').insert(TEST_STORE);
    await db.collection('client').insert(TEST_CLIENT);
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a client with an expired org', async () => {
    const db = await connection();
    await db.collection('organisations').insert({
      ...TEST_ORG,
      expiration: new Date(),
    });
    await db.collection('lrs').insert(TEST_STORE);
    await db.collection('client').insert(TEST_CLIENT);
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(ExpiredClientError, promise);
  });
});
