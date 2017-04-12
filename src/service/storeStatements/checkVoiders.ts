import { includes } from 'lodash';
import StatementModel from '../../models/StatementModel';
import VoidingError from '../../errors/VoidingError';
import voidVerbId from '../../utils/voidVerbId';
import Config from '../Config';

interface VoidResult {
  voiderIds: string[];
  voidedObjectIds: string[];
  voidingModels: StatementModel[];
}

const isVoiding = (model: StatementModel): boolean => {
  return model.statement.verb.id === voidVerbId;
};

const getVoiders = (statements: StatementModel[]): VoidResult => {
  return statements.reduce((result: VoidResult, model) => {
    if (isVoiding(model) && model.statement.object.objectType === 'StatementRef') {
      return {
        voiderIds: [...result.voiderIds, model.statement.id],
        voidedObjectIds: [...result.voidedObjectIds, model.statement.object.id],
        voidingModels: [...result.voidingModels, model],
      };
    }
    return result;
  }, {voiderIds: [], voidedObjectIds: [], voidingModels: []});
};

const checkWithinStatements = (voiderIds: string[], voidingModels: StatementModel[]): void => {
  voidingModels.forEach((model) => {
    if (model.statement.object.objectType !== 'StatementRef') {
      throw new Error('The `objectType` of a voider must be "StatementRef"');
    }
    const targetId = model.statement.object.id;
    if (includes(voiderIds, targetId)) {
      throw new VoidingError([targetId]);
    }
  });
};

const checkWithinRepo = async (
  config: Config,
  voiderIds: string[],
  voidedObjectIds: string[],
): Promise<void> => {
  // Checks that a new voider doesn't reference an existing voider.
  const voidersByObjectIds: string[] = await config.repo.getVoidersByIds({
    ids: voidedObjectIds,
  });
  if (voidersByObjectIds.length > 0) {
    throw new VoidingError(voidersByObjectIds);
  }

  // Checks that a voider doesn't void a new voider.
  const voidersByIds: string[] = await config.repo.getVoidersByObjectIds({
    ids: voiderIds,
  });
  if (voidersByIds.length > 0) {
    throw new VoidingError(voidersByIds);
  }
};

export default async (config: Config, statements: StatementModel[]): Promise<string[]> => {
  if (!config.enableVoidingChecks) return [];
  const { voiderIds, voidedObjectIds, voidingModels }: VoidResult = getVoiders(statements);

  if (voiderIds.length > 0) {
    checkWithinStatements(voiderIds, voidingModels);
    await checkWithinRepo(config, voiderIds, voidedObjectIds);
  }

  return voidedObjectIds;
};
