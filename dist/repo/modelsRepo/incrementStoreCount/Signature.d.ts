import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
export interface Opts {
    readonly client: ClientModel;
    readonly count: number;
}
declare type Signature = Member<Opts, void>;
export default Signature;
