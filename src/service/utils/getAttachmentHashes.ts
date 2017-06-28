import UnstoredStatementModel from '../../models/UnstoredStatementModel';
import StatementBase from '../../models/StatementBase';
import Attachment from '../../models/Attachment';

export type AttachmentsMap = { [hash: string]: Attachment };

const getStatementBaseAttachments = (statement: StatementBase): AttachmentsMap[] => {
  const attachments = statement.attachments;
  if (attachments === undefined) return [];

  const storedAttachments = attachments.filter((attachment) => {
    return attachment.fileUrl === undefined;
  }).map((attachment) => {
    return { [attachment.sha2]: attachment };
  });

  return storedAttachments;
};

export default (models: UnstoredStatementModel[]): AttachmentsMap => {
  const attachmentMaps = models.reduce((maps: AttachmentsMap[], model) => {
    const statementAttachments = getStatementBaseAttachments(model.statement);
    const subStatementAttachments = (
      model.statement.object.objectType === 'SubStatement'
        ? getStatementBaseAttachments(model.statement.object)
        : []
    );

    return [...maps, ...statementAttachments, ...subStatementAttachments];
  }, [] as AttachmentsMap[]);

  return Object.assign({}, ...attachmentMaps);
};
