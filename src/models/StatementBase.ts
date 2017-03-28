import Actor from './Actor';
import Verb from './Verb';
import Context from './Context';
import StatementObject from './StatementObject';

interface StatementBase {
  actor: Actor;
  object: StatementObject;
  context: Context;
  verb: Verb;
}

export default StatementBase;
