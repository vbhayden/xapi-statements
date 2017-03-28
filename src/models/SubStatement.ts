import StatementBase from './StatementBase';
import StatementObject from './StatementObject';

interface SubStatement extends StatementBase {
  objectType: 'SubStatement';
  object: StatementObject;
}

export default SubStatement;
