import matchesModel, { ModelMatcher } from './matchesModel';

const matcher = (statementKey: string, verb: string): Object => {
  return {
    [`${statementKey}.verb.id`]: verb,
  };
};

export default matchesModel(matcher, (opts) => {
  return opts.verb;
}) as ModelMatcher;
