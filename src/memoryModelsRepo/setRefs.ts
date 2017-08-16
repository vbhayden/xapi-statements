import SetRefsOptions from '../repoFactory/options/SetRefsOptions';
import matchesClientOption from './utils/matchesClientOption';
import Config from './Config';

export default (config: Config) => {
  return async (opts: SetRefsOptions): Promise<void> => {
    const refs = opts.refs.map((statement) => {
      return { statement };
    });
    config.state.statements = config.state.statements.map((model) => {
      if (
        model.statement.id === opts.id &&
        matchesClientOption(model, opts.client)
      ) {
        return {
          ...model,
          refs
        };
      }
      return model;
    });
  };
};
