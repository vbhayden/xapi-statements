import { sha1 } from 'object-hash';
import ClientModel from '../../../models/ClientModel';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import setupObjectTypes from './setupObjectTypes';
import setupPreHashStatement from './setupPreHashStatement';
import setupPostHashStatement from './setupPostHashStatement';

export default (models: any[], client: ClientModel) => {
  const storedTime = (new Date()).toISOString();
  return models.map((model: any): UnstoredStatementModel => {
    const objectTypesModel = setupObjectTypes(model);
    const preHashStatement = setupPreHashStatement(objectTypesModel, client.authority);
    const postHashStatement = setupPostHashStatement(preHashStatement, storedTime);
    return {
      hasGeneratedId: model.id === undefined,
      organisation: client.organisation,
      lrs_id: client.lrs_id,
      client: client._id,
      person: 'person',
      active: false,
      voided: false,
      timestamp: storedTime,
      stored: storedTime,
      refs: [],
      hash: sha1(preHashStatement),
      statement: postHashStatement,
    };
  });
};
