import SetRefsOptions from '../repoFactory/options/SetRefsOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

export default (config: Config) => {
  return async (opts: SetRefsOptions): Promise<void> => {
    const collection = (await config.db).collection('statements');
    const refs = opts.refs.map((statement) => {
      return { statement };
    });

    const query = { 
      'statement.id': opts.id,
      ...matchesClientOption(opts.client)
    };
    const update = { $set: { refs } };
    const options = { multi: false };

    await collection.update(query, update, options);
  };
};
