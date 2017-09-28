import { groupBy, Dictionary, mapValues } from 'lodash';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import UpRef from '../../../models/UpRef';
import ClientModel from '../../../models/ClientModel';
import Config from '../../Config';

export default async (
  config: Config,
  models: UnstoredStatementModel[],
  client: ClientModel
): Promise<Dictionary<String[]>> => {
  const statementIds = models.map((model) => {
    return model.statement.id;
  });
  
  const emptyGroupedUpRefIds = statementIds.reduce(
    (result, statementId) => {
      return {
        ...result,
        [statementId]: []
      };
    }, 
    []
  );
  
  const eagerLoadedUpRefs = await config.repo.getUpRefsByIds({ targetIds: statementIds, client });
  const groupedUpRefs = groupBy(eagerLoadedUpRefs, (upRef: UpRef) => {
    return upRef.targetId;
  });
  const populatedGroupedUpRefIds = mapValues(groupedUpRefs, (upRefs: UpRef[]): string[] => {
    return upRefs.map((upRef: UpRef) => {
      return upRef.sourceId;
    });
  });
  return { ...emptyGroupedUpRefIds, populatedGroupedUpRefIds };
};
