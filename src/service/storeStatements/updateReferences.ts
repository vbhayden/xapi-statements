import { includes, union, pull, groupBy, has, get, mapValues, Dictionary, size } from 'lodash';
import NoModel from '../../errors/NoModel';
import StatementModel from '../../models/StatementModel';
import UpRef from '../../models/UpRef';
import Config from '../Config';
import logger from '../../logger';

const shortId = (id: string) => {
  return id[id.length - 1];
};

const shortIds = (ids: string[]) => {
  return `[${ids.map(shortId).join(',')}]`;
};

const stack = <T>(value: T, values: T[]): T[] => {
  return union([value], values);
};

const getDownRefs = (models: StatementModel[]): StatementModel[] => {
  return models.filter((model) => {
    return model.statement.object.objectType === 'StatementRef';
  });
};

const eagerLoadUpRefs = async (
  config: Config,
  models: StatementModel[]
): Promise<Dictionary<String[]>> => {
  const statementIds = models.map((model) => {
    return model.statement.id;
  });
  const eagerLoadedUpRefs = await config.repo.getUpRefsByIds({ targetIds: statementIds });
  const groupedUpRefs = groupBy(eagerLoadedUpRefs, (upRef: UpRef) => {
    return upRef.targetId;
  });
  const groupedUpRefIds = mapValues(groupedUpRefs, (upRefs: UpRef[]): string[] => {
    return upRefs.map((upRef: UpRef) => {
      return upRef.sourceId;
    });
  });
  return groupedUpRefIds;
};

export default async (config: Config, models: StatementModel[]): Promise<void> => {
  if (!config.enableReferencing) return;

  const groupedUpRefIds = await eagerLoadUpRefs(config, models);

  if (size(groupedUpRefIds) === 0 && getDownRefs(models).length === 0) return;

  const getDownRefId = (id: string): Promise<string> => {
    logger.debug('getDownRefId', shortId(id));
    return config.repo.getDownRefId({ id });
  };

  const getUpRefIds = async (id: string): Promise<string[]> => {
    if (has(groupedUpRefIds, id)) {
      logger.silly('getUpRefIds cached', shortId(id));
      return get(groupedUpRefIds, id, []);
    }
    logger.debug('getUpRefIds', shortId(id));
    return config.repo.getUpRefIds({ id });
  };

  const getRefs = (refIds: string[]): Promise<StatementModel[]> => {
    return config.repo.getStatementsByIds({
      ids: refIds,
    });
  };

  const setRefs = async (id: string, givenRefIds: string[]): Promise<void> => {
    const refIds = pull(givenRefIds, id);
    const refModels = await getRefs(refIds);
    const refs = refModels.map((ref) => {
      return ref.statement;
    });
    logger.debug('setRefs', shortId(id), shortIds(refIds));
    return config.repo.setRefs({ id, refs });
  };

  const traverseDown = async (modelId: string, visitedIds: string[]): Promise<string[]> => {
    logger.silly('traverseDown', shortId(modelId), shortIds(visitedIds));
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
    logger.silly('traverseUp', shortIds(visitedIds), shortIds(refIds), shortId(modelId));
    if (includes(visitedIds, modelId)) return [];
    if (refIds.length > 0) await setRefs(modelId, refIds);

    const newVisitedIds = stack(modelId, visitedIds);
    const newRefIds = stack(modelId, refIds);
    const upRefIds = await getUpRefIds(modelId);
    return traverseUpRefs(newVisitedIds, newRefIds, upRefIds);
  };

  const traverseUpRefs = async (
    visitedIds: string[],
    refIds: string[],
    upRefIds: string[]
  ): Promise<string[]> => {
    logger.silly('traverseUpRefs', shortIds(visitedIds), shortIds(refIds), shortIds(upRefIds));
    const traversedIds: string[][] = await Promise.all(upRefIds.map((upRefId) => {
      return traverseUp(visitedIds, refIds, upRefId);
    }));
    return union(visitedIds, refIds, ...traversedIds);
  };

  await models.reduce(async (results, model): Promise<string[]> => {
    const visitedIds = await results;
    const modelId = model.statement.id;
    logger.debug('Updating references', shortId(modelId));
    if (includes(visitedIds, modelId)) return visitedIds;

    if (model.statement.object.objectType !== 'StatementRef') {
      return traverseUp([], [], modelId);
    } else {
      return traverseDown(modelId, []);
    }
  }, Promise.resolve([]));
};
