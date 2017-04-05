import StatementModel from '../models/StatementModel';
import StoreStatementsOptions from './options/StoreStatementsOptions';
import preValidationSetup from './utils/preValidationSetup';
import validateStatements from './utils/validateStatements';
import postValidationSetup from './utils/postValidationSetup';
import getUnstoredModels from './utils/getUnstoredModels';
import checkAttachments from './utils/checkAttachments';
import checkVoiders from './utils/checkVoiders';
import createStatements from './utils/createStatements';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreStatementsOptions): Promise<StatementModel[]> => {
    const preValidatedModels = preValidationSetup(opts.models);
    validateStatements(preValidatedModels);
    const postValidatedModels: StatementModel[] = postValidationSetup(preValidatedModels);
    const unstoredModels: StatementModel[] = await getUnstoredModels(config, postValidatedModels);

    await Promise.all([
      checkAttachments(config, unstoredModels, opts.attachments),
      checkVoiders(config, unstoredModels),
    ]);

    await createStatements(config, unstoredModels);

    // Completes actions that do not need to be awaited.
    createAttachments(config, opts.attachments);
    voidStatements(config, unstoredModels);
    updateReferences(config, unstoredModels);

    return postValidatedModels;
  };
};
