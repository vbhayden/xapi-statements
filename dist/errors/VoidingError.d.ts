import BaseError from 'jscommons/dist/errors/BaseError';
export default class extends BaseError {
    voidedStatementIds: string[];
    constructor(voidedStatementIds: string[]);
}
