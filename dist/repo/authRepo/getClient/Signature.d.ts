import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
export interface Opts {
    readonly authToken: string;
}
export interface Result {
    readonly client: ClientModel;
}
declare type Signature = Member<Opts, Result>;
export default Signature;
