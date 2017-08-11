import BaseError from 'jscommons/dist/errors/BaseError';
export default class  extends BaseError {
    targetId: string;
    constructor(targetId: string);
}
