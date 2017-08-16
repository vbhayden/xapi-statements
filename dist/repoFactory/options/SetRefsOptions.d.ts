import Statement from '../../models/Statement';
import ClientModel from '../../models/ClientModel';
interface SetRefsOptions {
    id: string;
    refs: Statement[];
    client: ClientModel;
}
export default SetRefsOptions;
