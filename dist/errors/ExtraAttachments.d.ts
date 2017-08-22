import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    hashes: string[];
    constructor(hashes: string[]);
}
