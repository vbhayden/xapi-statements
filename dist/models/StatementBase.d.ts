import Actor from './Actor';
import Attachment from './Attachment';
import Verb from './Verb';
import Context from './Context';
import StatementObject from './StatementObject';
interface StatementBase {
    actor: Actor;
    object: StatementObject;
    verb: Verb;
    context?: Context;
    attachments?: Attachment[];
}
export default StatementBase;
