import Member from 'jscommons/dist/utils/Member';
import ClientModel from '../../../models/ClientModel';
export interface Opts {
    id: string;
    client: ClientModel;
}
declare type Signature = Member<Opts, string>;
export default Signature;
