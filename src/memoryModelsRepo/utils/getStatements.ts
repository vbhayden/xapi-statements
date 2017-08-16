import Statement from '../../models/Statement';
import Config from '../Config';

export interface Options<Result> {
  config: Config;
  query: (model: Statement) => boolean;
  project: (model: Statement) => Result;
}

export default async <Result>({ config, query, project }: Options<Result>): Promise<Result[]> => {
  const results = config.state.statements.filter((model) => {
    return query(model.statement);
  }).map((model) => {
    return project(model.statement);
  });
  return results;
};
