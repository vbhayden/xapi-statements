import { sha1 } from 'object-hash';
import StatementModel from '../../models/StatementModel';
import setupPreHashStatement from './setupPreHashStatement';
import setupPostHashStatement from './setupPostHashStatement';

export default (models: any[]) => {
  const storedTime = (new Date()).toISOString();
  return models.map((model: any): StatementModel => {
    const preHashStatement = setupPreHashStatement(model);
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
