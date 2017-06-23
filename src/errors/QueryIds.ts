import BaseError from './BaseError';

export default class extends BaseError {
  constructor() {
    super("Cannot use 'statementId' and 'voidedStatementId'");
  }
}
