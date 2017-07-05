import VoidStatementsOptions from '../repoFactory/options/VoidStatementsOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: VoidStatementsOptions): Promise<void> => {
    config.state.statements = config.state.statements.map((model) => {
      if (opts.ids.includes(model.statement.id)) {
        model.voided = true;
      }
      return model;
    });
  };
};
