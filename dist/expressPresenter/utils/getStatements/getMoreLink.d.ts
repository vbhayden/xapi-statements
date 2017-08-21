import StatementsResult from '../../../models/StatementsResult';
import GetStatementsOptions from '../../../serviceFactory/options/GetStatementsOptions';
import StatementsResultOptions from '../../../serviceFactory/options/StatementsResultOptions';
export interface MoreLinkOptions {
    results: StatementsResult;
    statementsOpts: Partial<GetStatementsOptions>;
    resultOpts: StatementsResultOptions;
    urlPath: string;
}
declare const _default: (opts: MoreLinkOptions) => string;
export default _default;
