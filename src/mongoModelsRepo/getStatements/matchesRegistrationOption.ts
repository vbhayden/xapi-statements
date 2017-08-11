import matchesModel, { ModelMatcher } from './matchesModel';

const matcher = (statementKey: string, registration: string): Object => {
  return {
    [`${statementKey}.context.registration`]: registration,
  };
};

export default matchesModel<string>(matcher, (opts) => {
  return opts.registration;
}) as ModelMatcher;
