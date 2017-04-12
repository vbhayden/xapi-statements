import IdFormattedStatementBase from './IdFormattedStatementBase';
import IdFormattedActor from './IdFormattedActor';

interface IdFormattedStatement extends IdFormattedStatementBase {
  id: string;
  authority: IdFormattedActor;
  stored: string;
  timestamp: string;
}

export default IdFormattedStatement;
