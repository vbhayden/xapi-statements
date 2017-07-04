import BaseError from './BaseError';

export default class extends BaseError {
  constructor(public contentType: string) {
    super();
  }
}
