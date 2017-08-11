import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    opts: string[];
    constructor(opts: string[]);
}
