import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
export interface Opts {
    readonly ids: string[];
    readonly client: ClientModel;
}
declare type Signature = Member<Opts, void>;
export default Signature;
