import BaseError from './BaseError';

export default class extends BaseError {
  constructor(voidedStatementIds: string[]) {
    super(
      `A voiding statement cannot void another voiding statement (${voidedStatementIds.join()})`
    );
  }
}
