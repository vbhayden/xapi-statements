import { has, keys, values, groupBy, Dictionary } from 'lodash';
import StatementHash from '../../models/StatementHash';
import StatementModel from '../../models/StatementModel';
import Conflict from '../../errors/Conflict';
import Config from '../Config';

type ModelsMap = { [statementId: string]: StatementModel };
type ConflictRes = { modelsMap: ModelsMap, generatedIdModels: StatementModel[] };

const modelsConflicts = (models: StatementModel[]): ConflictRes => {
  return models.reduce(({ modelsMap, generatedIdModels }: ConflictRes, model: StatementModel) => {
    if (model.hasGeneratedId) {
      return {
        modelsMap,
        generatedIdModels: [
          ...generatedIdModels,
          model,
        ],
      };
    };
    const statementId = model.statement.id;
    if (has(modelsMap, statementId) && model.hash !== modelsMap[statementId].hash) {
      throw new Conflict(statementId);
    }
    return {
      modelsMap: {
        ...modelsMap,
        [statementId]: model,
      },
      generatedIdModels,
    };
  }, { modelsMap: {}, generatedIdModels: [] });
};

const repoConflicts = async (config: Config, modelsMap: ModelsMap): Promise<StatementModel[]> => {
  const hashesMap: Dictionary<StatementHash[]> = groupBy(await config.repo.getHashes({
    ids: keys(modelsMap),
  }), 'statementId');
  return values(modelsMap).filter((model: StatementModel) => {
    const statementId = model.statement.id;
    if (has(hashesMap, statementId)) {
      if (model.hash !== hashesMap[statementId][0].hash) {
        throw new Conflict(statementId);
      }
      return false;
    }
    return true;
  });
};

export default async (config: Config, models: StatementModel[]): Promise<StatementModel[]> => {
  if (!config.enableConflictChecks) return models;
  const conflictRes = modelsConflicts(models);
  const ungeneratedIdModels = await repoConflicts(config, conflictRes.modelsMap);
  return [...ungeneratedIdModels, ...conflictRes.generatedIdModels];
};
