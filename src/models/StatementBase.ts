import Actor from './Actor';
import Attachment from './Attachment';
import Verb from './Verb';
import Context from './Context';
import Result from './Result';
import StatementObject from './StatementObject';

interface StatementBase {
  actor: Actor;
  object: StatementObject;
  verb: Verb;
  context?: Context;
  result?: Result;
  attachments?: Attachment[];
}

export default StatementBase;
