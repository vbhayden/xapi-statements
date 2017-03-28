import BaseError from './BaseError';

export default class extends BaseError {
  constructor(modelName: string) {
    super(`${modelName} not found`);
  }
}
