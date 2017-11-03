import FilterAgent from '../../../../models/FilterAgent';
import isMatchingAgent from './isMatchingAgent';

export default (statementKey: string, filterAgent: FilterAgent): Object => {
  return {
    $or: [
      isMatchingAgent(`${statementKey}.actor`, filterAgent),
      {
        [`${statementKey}.object.objectType`]: { $in: ['Agent', 'Group'] },
        ...isMatchingAgent(`${statementKey}.object`, filterAgent),
      }
    ]
  };
};
