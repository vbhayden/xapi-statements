import Member from 'jscommons/dist/utils/Member';
import Statement from '../../../models/Statement';
import ClientModel from '../../../models/ClientModel';

export interface Opts {
  id: string;
  refs: Statement[];
  client: ClientModel;
}

type Signature = Member<Opts, void>;

export default Signature;
