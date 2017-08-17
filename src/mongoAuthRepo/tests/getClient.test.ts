import * as btoa from 'btoa';
import Config from '../../config';
import { MongoClient } from 'mongodb';
import mongoAuthRepo from '../../mongoAuthRepo';
import createClientModel from '../../tests/utils/createClientModel';
import * as assert from 'assert';

describe('getClient from mongo client', () => {
  const authConfig = {
    db: MongoClient.connect(Config.mongo.url)
  };

  const authRepo = mongoAuthRepo(authConfig);

  const basic_key = '123';
  const basic_secret = 'abc';

  const CLIENT_MODEL = createClientModel({
    _id: '5988f0f00000000000000123'
  });

  before( async () => {
    // Insert client to db
    await (await authConfig.db).collection('client').insert({
      ...CLIENT_MODEL,
      api: {
        basic_key,
        basic_secret
      }
    });
  });

  it('should return a client from the db', async () => {
    const b64 = btoa(`${basic_key}:${basic_secret}`);
    const authToken = `Basic ${b64}`;
    const result = await authRepo.getClient({ authToken });

    assert.equal(result.client._id, CLIENT_MODEL._id);
  });

  after( async () => {
     // clear client from db
    await (await authConfig.db).collection('client').remove({});
  });
});
