import GetStatementsOptions from '../../repoFactory/options/GetStatementsOptions';
export declare type Matcher<Option> = (statementKey: string, opt: Option, opts: GetStatementsOptions) => Object;
export declare type Getter<Option> = (opts: GetStatementsOptions) => Option | undefined;
export declare type ModelMatcher = (opts: GetStatementsOptions) => Object;
declare const _default: <Option>(matcher: Matcher<Option>, getter: Getter<Option>) => ModelMatcher;
export default _default;
