import BaseError from './BaseError';

export default class extends BaseError {
  constructor(public modelName: string) {
    super(`${modelName} not found`);
  }
}
