import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';

export type Matcher<Option> = (
  statementKey: string,
  opt: Option,
  opts: GetStatementsOptions
) => Object;
export type Getter<Option> = (opts: GetStatementsOptions) => Option | undefined;
export type ModelMatcher = (opts: GetStatementsOptions) => Object;

export default <Option>(matcher: Matcher<Option>, getter: Getter<Option>): ModelMatcher => {
  return (opts) => {
    const opt = getter(opts);
    return opt === undefined ? {} : {
      $or: [
        matcher('statement', opt, opts),
        matcher('refs.statement', opt, opts),
      ],
    };
  };
};
