import StatementModel from '../../models/StatementModel';
import StoreStatementsOptions from '../options/StoreStatementsOptions';
import Config from '../Config';
import preValidationSetup from './preValidationSetup';
import validateStatements from './validateStatements';
import postValidationSetup from './postValidationSetup';
import getUnstoredModels from './getUnstoredModels';
import checkAttachments from './checkAttachments';
import checkVoiders from './checkVoiders';
import createAttachments from './createAttachments';
import createStatements from './createStatements';
import voidStatements from './voidStatements';
import updateReferences from './updateReferences';

export default (config: Config) => {
  return async (opts: StoreStatementsOptions): Promise<string[]> => {
    const preValidatedModels = preValidationSetup(opts.models, opts.authority);
    validateStatements(preValidatedModels);
    const postValidatedModels: StatementModel[] = postValidationSetup(preValidatedModels);
    const unstoredModels: StatementModel[] = await getUnstoredModels(config, postValidatedModels);
    const voidedObjectIds: string[] = await checkVoiders(config, unstoredModels);
    await checkAttachments(config, unstoredModels, opts.attachments);

    await createStatements(config, unstoredModels);

    // Completes actions that do not need to be awaited.
    await createAttachments(config, opts.attachments);
    await voidStatements(config, unstoredModels, voidedObjectIds);
    await updateReferences(config, unstoredModels);

    return postValidatedModels.map((postValidatedModel: StatementModel) => {
      return postValidatedModel.statement.id;
    });
  };
};
