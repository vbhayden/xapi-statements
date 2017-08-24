import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';
import { ObjectID } from 'mongodb';

export default (opts: GetStatementsOptions): object => {
  if (opts.cursor === undefined) {
    return {};
  }

  return {
    _id: (
      opts.ascending
        ? { $gt: new ObjectID(opts.cursor) }
        : { $lt: new ObjectID(opts.cursor) }
    ),
  };
};
