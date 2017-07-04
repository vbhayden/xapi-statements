import BaseError from './BaseError';

export default class extends BaseError {
  constructor() {
    super('No statements in request content');
  }
}
