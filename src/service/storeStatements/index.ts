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
    const preValidatedModels = preValidationSetup(opts.models);
    validateStatements(preValidatedModels);
    const postValidatedModels = postValidationSetup(preValidatedModels, opts.authority);
    const unstoredModels = await getUnstoredModels(config, postValidatedModels);
    const voidedObjectIds = await checkVoiders(config, unstoredModels);
    await checkAttachments(config, unstoredModels, opts.attachments);

    await createStatements(config, unstoredModels);

    const statementIds = postValidatedModels.map((postValidatedModel: StatementModel) => {
      return postValidatedModel.statement.id;
    });

    // Completes actions that do not need to be awaited.
    const unawaitedUpdates: Promise<any> = Promise.all([
      createAttachments(config, opts.attachments),
      voidStatements(config, unstoredModels, voidedObjectIds),
      updateReferences(config, unstoredModels),
    ]);

    if (config.awaitUpdates === true) {
      await unawaitedUpdates;
    }

    return statementIds;
  };
};
