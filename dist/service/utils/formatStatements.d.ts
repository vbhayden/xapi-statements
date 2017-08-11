import IdFormattedStatement from '../../models/IdFormattedStatement';
import Statement from '../../models/Statement';
import UnstoredStatementModel from '../../models/UnstoredStatementModel';
declare const _default: (models: UnstoredStatementModel[], format: string, langs: string[]) => Statement[] | IdFormattedStatement[];
export default _default;
