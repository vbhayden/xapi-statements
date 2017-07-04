import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor(public opts: string[]) {
    super();
    // `Should not contain '${opts.join(', ')}' when 'statementId' or 'voidedStatementId' are used.`
  }
}
