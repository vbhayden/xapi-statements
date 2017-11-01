import { groupBy, mapValues } from 'lodash';
import { sha1 } from 'object-hash';
import ClientModel from '../../../models/ClientModel';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import checkSignedStatements from './checkSignedStatements';
import setupObjectTypes from './setupObjectTypes';
import setupPreHashStatement from './setupPreHashStatement';
import setupPostHashStatement from './setupPostHashStatement';
import AttachmentModel from '../../../models/AttachmentModel';
import getRegistrations from '../queriables/getRegistrations';
import getVerbs from '../queriables/getVerbs';
import getActivities from '../queriables/getActivities';

export default async (models: any[], attachments: AttachmentModel[], client: ClientModel) => {
  const storedTime = new Date();
  const storedTimeString = storedTime.toISOString();

  const hashAttachmentDictionary = groupBy(attachments, (attachment) => {
    return attachment.hash;
  });
  const uniqueHashAttachmentDictionary = mapValues(hashAttachmentDictionary, (attachments) => {
    return attachments[0];
  });

  const unstoredModelPromises = models.map(async (model: any): Promise<UnstoredStatementModel> => {
    const objectTypesModel = setupObjectTypes(model);
    await checkSignedStatements(objectTypesModel, uniqueHashAttachmentDictionary);
    const preHashStatement = setupPreHashStatement(objectTypesModel);
    const fullStatementWithID = { ...objectTypesModel, ...preHashStatement };
    const postHashStatement = setupPostHashStatement(fullStatementWithID, storedTimeString, client.authority);
    const timestampTime = new Date(postHashStatement.timestamp);
    const agents: any = [];
    const relatedAgents: any[] = [];
    const activities: string[] = [];
    const relatedActivities: string[] = [];

    return {
      hasGeneratedId: model.id === undefined,
      organisation: client.organisation,
      lrs_id: client.lrs_id,
      client: client._id,
      person: null,
      active: true,
      voided: false,
      timestamp: timestampTime,
      stored: storedTime,
      refs: [],
      hash: sha1(preHashStatement),
      agents,
      relatedAgents,
      registrations: getRegistrations(model),
      verbs: getVerbs(model),
      activities: getActivities(model),
      relatedActivities,
      statement: postHashStatement,
    };
  });

  const unstoredModels = await Promise.all(unstoredModelPromises);
  return unstoredModels;
};
