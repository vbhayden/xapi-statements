import { Opts } from '../Signature';
export declare type Matcher<Option> = (opt: Option, opts: Opts) => Object;
export declare type Getter<Option> = (opts: Opts) => Option | undefined;
export declare type ModelMatcher = (opts: Opts) => Object;
declare const _default: <Option>(matcher: Matcher<Option>, getter: Getter<Option>) => ModelMatcher;
export default _default;
