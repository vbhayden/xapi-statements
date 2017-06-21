import matchesModel from './matchesModel';

const matcher = (statementKey: string, verb: string): Object => {
  return verb === undefined ? {} : {
    [`${statementKey}.verb.id`]: verb,
  };
};

export default matchesModel(matcher, (opts) => {
  return opts.verb;
});
