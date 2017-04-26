import { includes, union } from 'lodash';
import NoModel from '../../errors/NoModel';
import StatementModel from '../../models/StatementModel';
import Config from '../Config';
import logger from '../../logger';

export default async (config: Config, models: StatementModel[]): Promise<void> => {
  if (!config.enableReferencing) return;

  const getDownRefId = (id: string): Promise<string> => {
    logger.debug('getDownRefId', id);
    return config.repo.getDownRefId({ id });
  };

  const getUpRefIds = (id: string): Promise<string[]> => {
    logger.debug('getUpRefIds', id);
    return config.repo.getUpRefIds({ id });
  };

  const setRefs = (id: string, refIds: string[]): Promise<void> => {
    logger.debug('setRefs', id, refIds);
    return config.repo.setRefs({ id, refIds });
  };

  const stack = <T>(value: T, values: T[]): T[] => {
    return union([value], values);
  };

  const traverseDown = async (modelId: string, visitedIds: string[]): Promise<string[]> => {
    logger.silly('traverseDown', modelId, visitedIds);
    try {
      const newVisitedIds = stack(modelId, visitedIds);
      const downRefId = await getDownRefId(modelId);
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
    logger.silly('traverseUp', visitedIds, refIds, modelId);
    if (includes(visitedIds, modelId)) return [];
    if (refIds.length > 0) await setRefs(modelId, refIds);

    const newVisitedIds = stack(modelId, visitedIds);
    const newRefIds = stack(modelId, refIds);
    const upRefIds = await getUpRefIds(modelId);
    return traverseUpRefs(newVisitedIds, newRefIds, upRefIds)
  };

  const traverseUpRefs = async (
    visitedIds: string[],
    refIds: string[],
    upRefIds: string[]
  ): Promise<string[]> => {
    logger.silly('traverseUpRefs', visitedIds, refIds, upRefIds);
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
    if (model.statement.object.objectType !== 'StatementRef') {
      return traverseUp([], [], modelId);
    } else {
      return traverseDown(modelId, []);
    }
  }, Promise.resolve([]));
};
