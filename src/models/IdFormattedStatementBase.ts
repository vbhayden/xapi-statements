import IdFormattedActor from './IdFormattedActor';
import Attachment from './Attachment';
import IdFormattedVerb from './IdFormattedVerb';
import IdFormattedContext from './IdFormattedContext';
import IdFormattedStatementObject from './IdFormattedStatementObject';

interface IdFormattedStatementBase {
  actor: IdFormattedActor;
  object: IdFormattedStatementObject;
  verb: IdFormattedVerb;
  context?: IdFormattedContext;
  attachments?: Attachment[];
}

export default IdFormattedStatementBase;
