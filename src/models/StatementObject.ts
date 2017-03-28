import SubStatement from './SubStatement';
import StatementRef from './StatementRef';
import Activity from './Activity';
import Actor from './Actor';

type StatementObject = (SubStatement|Activity|Actor|StatementRef);

export default StatementObject;
