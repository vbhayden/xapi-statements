import { includes, union } from 'lodash';
import NoModel from '../../errors/NoModel';
import StatementModel from '../../models/StatementModel';
import Config from '../Config';
import logger from '../../logger';

export default async (config: Config, models: StatementModel[]): Promise<void> => {
  if (!config.enableReferencing) return;

  const traverseDown = async (modelId: string, visitedIds: string[]): Promise<string[]> => {
    logger.debug('traverseDown', modelId, visitedIds);
    try {
      const newVisitedIds = [modelId, ...visitedIds];
      const downRefId = await config.repo.getDownRefId({ id: modelId });
      return (
        includes(newVisitedIds, downRefId) ?
        traverseUp([], newVisitedIds, downRefId) :
        traverseDown(downRefId, newVisitedIds)
      );
    } catch (err) {
      if (err.constructor === NoModel) {
        return traverseUp([], [], modelId);
      }
      throw err;
    }
  };

  const traverseUp = async (
    visitedIds: string[],
    refIds: string[],
    modelId: string
  ): Promise<string[]> => {
    logger.debug('traverseUp', visitedIds, refIds, modelId);
    if (includes(visitedIds, modelId)) return [];
    if (refIds.length > 0) await config.repo.setRefs({ id: modelId, refIds });

    const newVisitedIds = [modelId, ...visitedIds];
    const newRefIds = [modelId, ...refIds];
    const upRefIds = await config.repo.getUpRefIds({ id: modelId });
    return traverseUpRefs(newVisitedIds, newRefIds, upRefIds)
  };

  const traverseUpRefs = async (
    visitedIds: string[],
    refIds: string[],
    upRefIds: string[]
  ): Promise<string[]> => {
    logger.debug('traverseUpRefs', visitedIds, refIds, upRefIds);
    const traversedIds: string[][] = await Promise.all(upRefIds.map((upRefId) => {
      return traverseUp(visitedIds, refIds, upRefId);
    }));
    return union(visitedIds, refIds, ...traversedIds);
  };

  await models.reduce(async (results, model): Promise<string[]> => {
    const visitedIds = await results;
    const modelId = model.statement.id;
    if (includes(visitedIds, modelId)) return visitedIds;
    logger.debug('Updating references', modelId);
    return traverseDown(modelId, []);
  }, Promise.resolve([]));
};
