import { includes, union } from 'lodash';
import NoModel from '../../errors/NoModel';
import StatementModel from '../../models/StatementModel';
import Config from '../Config';

export default async (
  config: Config,
  models: StatementModel[]
): Promise<void> => {
  if (!config.enableReferencing) return;
  const traverseDown = async (modelId: string, visitedIds: string[]): Promise<string[]> => {
    try {
      const downRefId = await config.repo.getDownRefId({ id: modelId });
      return (
        includes(visitedIds, downRefId) ?
        traverseUp([], visitedIds, downRefId) :
        traverseDown(downRefId, visitedIds)
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
    if (includes(visitedIds, modelId)) return [];
    await config.repo.setRefs({ id: modelId, refIds });

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
    const traversedIds: string[][] = await Promise.all(upRefIds.map((upRefId) => {
      return traverseUp(visitedIds, refIds, upRefId);
    }));
    return union(visitedIds, refIds, ...traversedIds);
  };

  await models.reduce(async (results, model): Promise<string[]> => {
    const visitedIds = await results;
    return traverseDown(model.statement.id, visitedIds);
  }, Promise.resolve([]));
};
