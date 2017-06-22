import GetStatementsOptions from '../../repo/GetStatementsOptions';

export type Matcher<Option> = (
  statementKey: string,
  opt: Option,
  opts: GetStatementsOptions
) => Object;
export type Getter<Option> = (opts: GetStatementsOptions) => Option|undefined;

export default <Option>(matcher: Matcher<Option>, getter: Getter<Option>) => {
  return (opts: GetStatementsOptions): Object => {
    const opt = getter(opts);
    return opt === undefined ? {} : {
      $or: [
        matcher('statement', opt, opts),
        matcher('refs.statement', opt, opts),
      ],
    };
  };
};
