import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor(public statementId: string) {
    super();
    // `${statementId} is duplicated in the current batch`
  }
}
