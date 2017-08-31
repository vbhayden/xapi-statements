import checkScopes from 'jscommons/dist/service/utils/checkScopes';
import { PassThrough } from 'stream';
import { STATEMENT_WRITE_SCOPES } from '../../utils/scopes';
import StoreStatementsOptions from '../../serviceFactory/options/StoreStatementsOptions';
import AttachmentModel from '../../models/AttachmentModel';
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
import updateFullActivities from './updateFullActivities';

/* istanbul ignore next */
const awaitUpdates = async (config: Config, updates: Promise<any>) => {
  if (config.awaitUpdates === true) {
    await updates;
  }
};

const cloneAttachments = (attachmentModels: AttachmentModel[]): AttachmentModel[] => {
  return attachmentModels.map((attachmentModel) => {
    return {
      ...attachmentModel,
      stream: attachmentModel.stream.pipe(new PassThrough()),
    };
  });
};

export default (config: Config) => {
  return async (opts: StoreStatementsOptions): Promise<string[]> => {
    checkScopes(STATEMENT_WRITE_SCOPES, opts.client.scopes);
    const preValidatedModels = preValidationSetup(opts.models);
    validateStatements(preValidatedModels);
    const attachments = cloneAttachments(opts.attachments);
    const clonedAttachments = cloneAttachments(opts.attachments);
    const postValidatedModels = await postValidationSetup(
      preValidatedModels,
      clonedAttachments,
      opts.client
    );
    const unstoredModels = await getUnstoredModels(config, postValidatedModels, opts.client);
    const voidedObjectIds = await checkVoiders(config, unstoredModels, opts.client);
    checkAttachments(config, unstoredModels, attachments);

    await createStatements(config, unstoredModels);

    const statementIds = postValidatedModels.map((postValidatedModel) => {
      return postValidatedModel.statement.id;
    });

    // Completes actions that do not need to be awaited.
    const unawaitedUpdates: Promise<any> = Promise.all([
      createAttachments(config, attachments),
      voidStatements(config, unstoredModels, voidedObjectIds, opts.client),
      updateReferences(config, unstoredModels, opts.client),
      updateFullActivities({ config, models: unstoredModels, client: opts.client }),
    ]);

    await awaitUpdates(config, unawaitedUpdates);
    config.repo.emitNewStatements({ ids: statementIds });

    return statementIds;
  };
};
