import BaseError from './BaseError';

export default class extends BaseError {
  constructor() {
    super('There was data beyond the final boundary');
  }
}
