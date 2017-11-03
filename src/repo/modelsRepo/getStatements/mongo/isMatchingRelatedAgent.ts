import FilterAgent from '../../../../models/FilterAgent';
import isMatchingAgent from './isMatchingAgent';
import isMatchingUnrelatedAgent from './isMatchingUnrelatedAgent';

const isMatchingRelatedActor = (statementKey: string, filterAgent: FilterAgent): Object => {
  return {
    $or: [
      isMatchingUnrelatedAgent(statementKey, filterAgent),
      isMatchingAgent(`${statementKey}.context.team`, filterAgent),
      isMatchingAgent(`${statementKey}.context.instructor`, filterAgent),
      ...(
        statementKey !== 'statement' && statementKey !== 'refs.statement' ? [] : [{
          [`${statementKey}.object.objectType`]: 'SubStatement',
          ...isMatchingRelatedActor(`${statementKey}.object`, filterAgent),
        }]
      ),
    ],
  };
};

export default (statementKey: string, filterAgent: FilterAgent): Object => {
  return {
    $or: [
      isMatchingAgent(`${statementKey}.authority`, filterAgent),
      isMatchingRelatedActor(statementKey, filterAgent)
    ]
  };
};
