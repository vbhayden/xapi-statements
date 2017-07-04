import BaseError from 'jscommons/dist/errors/BaseError';

export default class extends BaseError {
  constructor() {
    super();
    // 'There was data before the first boundary'
  }
}
