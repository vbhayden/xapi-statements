import AttachmentModel from '../../models/AttachmentModel';
import Config from '../Config';

export default async (
  config: Config,
  attachments: AttachmentModel[]
): Promise<void> => {
  if (!config.enableAttachmentCreation) return;
  await config.repo.createAttachments({
    models: attachments,
  });
};
