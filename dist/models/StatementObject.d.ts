import SubStatement from './SubStatement';
import SubStatementObject from './SubStatementObject';
declare type StatementObject = (SubStatement | SubStatementObject);
export default StatementObject;
