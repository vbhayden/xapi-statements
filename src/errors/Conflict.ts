import BaseError from './BaseError';

export default class extends BaseError {
  constructor(statementId: string) {
    super(`${statementId} is conflicting`);
  }
}
