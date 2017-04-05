import StatementModel from '../../models/StatementModel';
import VoidingError from '../../errors/VoidingError';
import voidVerbId from '../../utils/voidVerbId';
import Config from '../Config';

type VoidResult = { voidingIds: string[], voidingModels: StatementModel[] };

const isVoiding = (model: StatementModel): boolean => {
  return model.statement.verb.id === voidVerbId;
};

const getVoiders = (statements: StatementModel[]): VoidResult => {
  return statements.reduce((result: VoidResult, model) => {
    if (isVoiding(model)) {
      return {
        voidingIds: [...result.voidingIds, model.statement.id],
        voidingModels: [...result.voidingModels, model],
      };
    }
    return result;
  }, {voidingIds: [], voidingModels: []});
};

const checkWithinStatements = (voidingIds: string[], voidingModels: StatementModel[]): void => {
  voidingModels.forEach((model) => {
    if (model.statement.object.objectType !== 'StatementRef') {
      throw new Error('The `objectType` of a voider must be "StatementRef"');
    }
    const targetId = model.statement.object.id;
    if (voidingIds.includes(targetId)) {
      throw new VoidingError([targetId]);
    }
  });
};

const checkWithinRepo = async (config: Config, voidingIds: string[]): Promise<void> => {
  const voidersByObjectIds: string[] = await config.repo.getVoidersByObjectIds({
    ids: voidingIds,
  });
  if (voidersByObjectIds.length > 0) {
    throw new VoidingError(voidersByObjectIds);
  }
  const voidersByIds: string[] = await config.repo.getVoidersByIds({
    ids: voidingIds,
  });
  if (voidersByIds.length > 0) {
    throw new VoidingError(voidersByIds);
  }
};

export default async (config: Config, statements: StatementModel[]): Promise<void> => {
  if (!config.enableVoidingChecks) return;
  const { voidingIds, voidingModels }: VoidResult = getVoiders(statements);

  if (voidingIds.length > 0) {
    checkWithinStatements(voidingIds, voidingModels);
    await checkWithinRepo(config, voidingIds);
  }
};
