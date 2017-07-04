import BaseError from './BaseError';

export default class extends BaseError {
  constructor() {
    super('Missing required \'statementId\' query param');
  }
}
