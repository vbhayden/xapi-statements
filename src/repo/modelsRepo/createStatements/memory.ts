import { v1 as uuid } from 'uuid';
import UnstoredStatementModel from '../../../models/UnstoredStatementModel';
import Signature, { Opts } from './Signature';
import Config from '../utils/memoryModels/Config';

export default (config: Config): Signature => {
  return async ({ models }) => {
    const idModels = models.map((model) => {
      return { ...model, _id: uuid() };
    });
    config.state.statements = config.state.statements.concat(idModels);
    return models;
  };
};
