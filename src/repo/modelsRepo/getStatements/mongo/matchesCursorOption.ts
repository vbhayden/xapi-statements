import { Opts } from '../Signature';
import { ObjectID } from 'mongodb';

export default (opts: Opts): object => {
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
