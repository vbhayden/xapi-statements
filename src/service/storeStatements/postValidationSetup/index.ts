import { sha1 } from 'object-hash';
import StatementModel from '../../../models/StatementModel';
import setupObjectTypes from './setupObjectTypes';
import setupPreHashStatement from './setupPreHashStatement';
import setupPostHashStatement from './setupPostHashStatement';

export default (models: any[], authority: any) => {
  const storedTime = (new Date()).toISOString();
  return models.map((model: any): StatementModel => {
    const objectTypesModel = setupObjectTypes(model);
    const preHashStatement = setupPreHashStatement(objectTypesModel, authority);
    const postHashStatement = setupPostHashStatement(preHashStatement, storedTime);
    return {
      hasGeneratedId: model.id === undefined,
      organisation: 'organisation_123',
      lrs_id: 'lrs_123',
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
